const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const _get = (options) => {
  request('GET', options)
}

const _post = (options) => {
  request('POST', options)
}

const url = "https://www.easy-mock.com/mock/5adffae3526fec1c9efa8a2e/";

const request = (method, options) => {
  wx.request({
    url: url + options.method,
    header: { 'Content-Type': method === "POST" ? 'application/x-www-form-urlencoded' : 'application/json' },
    data: options.data,
    success: (res) => {
      options.success(res)
    },
    fail: (res) => {
      if (options.fail) options.fail(res)
    },
    complete: (res) => {
      if (options.complete) options.complete(res)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  _get: _get,
  _post: _post
}
