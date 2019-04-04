### 安装
vue add mockjs

### 配置
在vue.config.js中添加
```javascript
pluginOptions: {
    mock: {
        entry: 'mock.js',   // mock配置文件，默认为 'mock.js'
        power: true         // 开关，默认为 true
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
