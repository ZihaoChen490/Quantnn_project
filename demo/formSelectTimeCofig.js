const formSelectTimeCofig = {
  title: "AI择时订单",
  desc: "请将订单填写完成，填完会发送至服务器，并返回所选择的模型预测的择时结果，该策略模型为用户自己制作，结果有风险，仅有参考意义",
  rules: [{
    name: 'selectstock',
    rules: [
        {required: true, message: '请选择需要预测的股票'}
    ],
},
  {
      name: 'modelClass',
      rules: {required: true, message: '请选择模型的种类与参数'},
  }, {
    name: 'starttime',
    rules: {required: true, message: '请填写预计售出的起始时间'},
},{
  name: 'endtime',
  rules: {required: true, message: '请填写预计售出的最晚时间'},
}, {
      name: 'mobile',
      rules: [
          {required: true, message: '请填写手机号码'}, {mobile: true, message: 'mobile格式不对'}
      ],
  }
  ],
  formInfo: [
    {
        id: 'selectstock',
        title: '请选择需要预测的股票名称或代码',
        type: 'picker-input',
        settings: {
            pickerId:'selectstock',
            title: '点此选择',
            prop: '',
            dataField: '',
            placeHolder:'请填写股票信息',
            pickerIndex: 0,
            range: ["股票代码", "股票名称"],
            placeholder: ["请填写股票信息"],
            options: [

            ]
        }
    }, 
    {
        id: 'modelClass',
        title: '选择使用的模型与参数',
        type: 'multiselector',
        settings: {
            pickerId:'modelclass',
            mode:'multiSelector',
            title: '模型种类',
            prop: '',
            dataField: '',
            pickerIndex: 0,
            range: ["RNN", "GRU","LSTM"],
            placeholder: "请填写模型与参数",
            options: [

            ]
        }
    },
      {
          id: 'starttime',
          title: '预测起始时间',
          type: 'date',
          settings: {
              mode: 'date',
              title: '点此选择',
              prop: 'date',
              dataField: 'date',
              start: '2022-05-21',
              end:'2045-01-01',
              placeHolder:'请填写起始时间',
              options: [

              ]
          }
      },
      {
          id: 'endtime',
          title: '预测结束时间',
          type: 'date',
          settings: {
              mode: 'date',
              title: '点此选择',
              prop: 'date',
              dataField: 'date',
              start: '2022-05-21',
              end:'2045-01-01',
              placeHolder:'请填写结束时间',
              options: [

              ]
          }
      },
      {
          id: 'usermore',
          title: '备注',
          type: 'textarea',
          settings: {
              title: '',
              prop: 'date',
              dataField: '',
              placeHolder:'请填写备注',
              warn: '',
              options: [

              ]
          }
      },

      {
          id: 'vcode',
          title: '验证码',
          type: 'vcode',
          settings: {
              title: '',
              prop: 'vcode',
              dataField: 'vcodeNum',
              placeHolder:'请填写验证码',
              vcodeVerifyCode:'vcodeVerifyCode', //加盐后的验证码的字段名称
              warn: '验证码',
              options: [

              ]
          }
      },
      {
          id: 'mobile',
          title: '手机',
          type: 'mobile',
          settings: {
              title: '',
              prop: 'mobile',
              dataField: 'mobile',
              placeHolder:'请填写验证码',
              vcodeVerifyCode:'vcodeVerifyCode', //加盐后的验证码的字段名称
              warn: '验证码',
              options: [

              ]
          }
      },
  ],
  agreeLink: "https://developers.weixin.qq.com/miniprogram/dev/framework/"

}
export default formSelectTimeCofig;