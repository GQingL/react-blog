import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { getDvaApp } from 'umi'
import { PlusOutlined, LoadingOutlined, InboxOutlined } from '@ant-design/icons'
import storageHelper from '@/utils/storage'

const { Dragger } = Upload

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

/**
 * base64转blob文件对象
 * @param {*} base64String
 * @returns
 */
function base64ToBlob(base64String) {
  const base64 = base64String.substring(base64String.indexOf(',') + 1)
  const byteCharacters = window.atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: 'image/jpeg' }) // 根据实际情况设置MIME类型
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
    return isJpgOrPng && isLt4M
  }

  const customRequest = info => {
    getBase64(info.file, async url => {
      const blob = base64ToBlob(url)
      UploadToMinIo(blob, url, info.file.name)
      info.onSuccess(1)
    })
  }

  /**
   * 上传文件
   * @param {*} file blob文件对象
   * @returns
   */
  const UploadToMinIo = (file, url, fileName) => {
    const user = storageHelper.get('user')
    const formData = new FormData()
    formData.append('file', file, fileName)
    formData.append('userId', user.id)
    return new Promise((resolve, reject) => {
      getDvaApp()._store.dispatch({
        type: 'file/uploadImg',
        payload: formData,
        callback(response) {
          if (response !== undefined && response !== null && response !== '') {
            setLoading(false)
            setImageUrl(url)
            returnImageUrl(response)
          } else {
            setLoading(false)
          }
        },
      })
    })
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
        name="fm"
        listType="picture-card"
        className="avatar-uploader"
        style={{ width: 128, height: 128 }}
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
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
      <Dragger
        name="tz"
        customRequest={customRequest}
        beforeUpload={beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽图片到这个区域</p>
      </Dragger>
    )
  }
}

export default FileUpload
