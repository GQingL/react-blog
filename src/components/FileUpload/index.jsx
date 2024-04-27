import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { getDvaApp } from 'umi'
import { PlusOutlined, LoadingOutlined, InboxOutlined } from '@ant-design/icons'
import storageHelper from '@/utils/storage'

const { Dragger } = Upload

// 定义工具函数，用于处理Base64和Blob的转换
const base64Util = {
  getBase64(file, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.addEventListener('error', () => {
      console.error('Error occurred while reading the file.')
    })
    reader.readAsDataURL(file)
  },
  base64ToBlob(base64String) {
    if (!base64String.startsWith('data:')) {
      console.error('Invalid base64 string')
      return null
    }
    const base64 = base64String.substring(base64String.indexOf(',') + 1)
    const byteCharacters = window.atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: 'image/jpeg' })
  },
}

const FileUpload = props => {
  const { type, returnImageUrl } = props
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const beforeUpload = file => {
    const isJpgOrPng = ['image/png', 'image/jpeg', 'image/gif'].includes(
      file.type,
    )
    if (!isJpgOrPng) {
      message.error('你只能上传JPG/PNG格式的图片')
    }
    // 包含4MB
    const isLt4M = file.size / 1024 / 1024 <= 4
    if (!isLt4M) {
      message.error('图片必须小于等于4M')
    }
    return isJpgOrPng && isLt4M
  }

  const customRequest = info => {
    base64Util.getBase64(info.file, async url => {
      try {
        const blob = base64Util.base64ToBlob(url)
        if (!blob) throw new Error('Base64转换为Blob失败')
        await UploadToMinIo(blob, url, info.file.name)
        info.onSuccess(1)
      } catch (error) {
        console.error('上传过程中发生错误:', error)
        message.error('文件上传失败')
      }
    })
  }

  /**
   * 上传文件
   * @param {*} file blob文件对象
   * @returns
   */
  const UploadToMinIo = async (file, url, fileName) => {
    const user = storageHelper.get('user')
    if (!user) {
      throw new Error('用户信息未找到')
    }
    const formData = new FormData()
    formData.append('file', file, fileName)
    formData.append('userId', user.id)

    try {
      const response = await new Promise(resolve => {
        getDvaApp()._store.dispatch({
          type: 'file/uploadImg',
          payload: formData,
          callback: res => resolve(res),
        })
      })
      if (response) {
        setLoading(false)
        setImageUrl(url)
        returnImageUrl(response)
      } else {
        setLoading(false)
        message.error('上传响应无效')
      }
    } catch (error) {
      setLoading(false)
      console.error('上传失败:', error)
      message.error('文件上传失败')
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    // 根据type渲染不同的上传组件
    type === 'click' ? (
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
    ) : (
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
  )
}

export default FileUpload
