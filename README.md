### Install 安装
vue add mockjs

### Config 配置
在vue.config.js中添加：
add in vue.config.js:
```javascript
pluginOptions: {
    mock: {
        // mock配置文件，默认为 'mock.js'
        // Configuration file, default is 'mock.js'
        entry: 'mock.js',  
        // 开关，默认为 true
        // switch, default is true
        power: true         
    }
}
```

mock.js: 
```javascript
app.post('/test', (req, res) => {
    res.json({
      code: '0',
      result: {
      }
    })
  })
```
