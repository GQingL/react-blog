import React, { useState } from 'react'
import { Upload, message } from 'antd'
import moment from 'moment'
import { getDvaApp } from 'umi'
import { PlusOutlined, LoadingOutlined, InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const UploadToOss = (path, file) => {
  return new Promise((resolve, reject) => {
    console.log(file)
    getDvaApp()._store.dispatch({
      type: 'file/uploadImg',
      payload: { file: file, userId: 1 },
    })
  })
}

const filePath = file => {
  // 上传文件路径和名称
  return `${moment().format('YYYYMMDD')}/${file.uid}.${file.type.split('/')[1]}`
}

const FileUpload = props => {
  const { type, returnImageUrl } = props
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const beforeUpload = file => {
    const isJpgOrPng =
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/gif'
    if (!isJpgOrPng) {
      message.error('你只能上传JPG/PNG格式的图片')
    }
    const isLt4M = file.size / 1024 / 1024 < 4
    if (!isLt4M) {
      message.error('图片必须小于4M')
    }
    UploadToOss(filePath(file), file)
      .then(data => {
        setImageUrl(data.url)
        returnImageUrl(data.url)
      })
      .catch(error => {
        console.log(error)
      })
    return isJpgOrPng && isLt4M
  }

  const onChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
    if (info.file.status === 'done') {
      console.log(info)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  if (type === 'click') {
    return (
      <Upload
        name="封面"
        listType="picture-card"
        className="avatar-uploader"
        style={{ width: 128, height: 128 }}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={onChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }

  if (type === 'drag') {
    return (
      <Dragger name="拖拽" onChange={onChange} beforeUpload={beforeUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽图片到这个区域</p>
      </Dragger>
    )
  }
}

export default FileUpload
