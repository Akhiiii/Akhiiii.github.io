/* Admin FORM  UI*/

import React,{ Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css'; 
import {Form, Input, Row, Col,Select,Button,Table,Popconfirm,Icon,Divider} from 'antd';

const FormItem = Form.Item;


class AdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserData:[],
            loading : false,
            AdminData:[],
            visible: false
        };           
    }

    componentWillReceiveProps(nextProps) {
         if (nextProps.data !== undefined ){
            this.setState({UserData: nextProps.data.users,loading : nextProps.loading});
           }
        if (nextProps.AdminData.user !== undefined ){
            this.setState({AdminData:nextProps.AdminData.user,loading : nextProps.loading})
            }
        if (nextProps.AdminData.user === undefined ){
            this.setState({AdminData:[],loading : nextProps.loading,visible:false})
        }
    }
        
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'form/actionList',
          payload: {},
        });
    }
    
    
    handleSubmit = (e) => {
        const { dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFields((errors,values) => {
            if(errors){ 
                console.log('error');
            }        
            if (!errors) {
               
                console.log('Received values of form: ', values);
                var obj = {
                    user_id : values.user_id,
                    name:values.name,
                    email_id : values.email_id,
                    password : values.password,
                    mobile_no : values.mobile_no,
                    role : values.role 
                }
                if(this.state.AdminData.user_id!=null){  
                    obj.user_id=this.state.AdminData.user_id;
                 
                    dispatch({
                        type: 'form/Edit',
                        payload: obj,
                    });
                    this.props.form.resetFields();
                   
                }
                else{
                    dispatch({
                        type: 'form/actionSave',
                        payload: obj,
                    });
                    this.props.form.resetFields();
                }
                
        }
      });   
   
    }

    deleteConfirm = (item) =>{
        console.log(item.user_id);
        const { dispatch} = this.props;
        dispatch({
            type: 'form/remove',
            payload: item.user_id,
          });
    }

    getById = (item) =>{
        console.log(item.user_id);
        const { dispatch} = this.props;
        this.setState({visible: true})
        dispatch({
            type: 'form/byId',
            payload: item.user_id,
          });
    }


  render(){
    
    const { getFieldDecorator} = this.props.form;
    const AdminData = this.state.AdminData;
    console.log(AdminData);
    const tableColumns = [
        {
          title: 'Name',
          width:170,
          dataIndex: 'name',
          id: 'Name',
        },
        {
          title: 'Email Id',
          dataIndex: 'email_id',
          width: 230,
        }, 
        {
            title: 'Mobile No',
            dataIndex: 'mobile_no',
            width: 230,
          },
    
        {   title: 'Role',
            width: 150,
            dataIndex: 'role',
        },
    
        {
          title: 'Actions',
          width: 80,
          render: item => (
            <div>
              <Popconfirm
                title="are you sure?"
                 onConfirm={() => this.deleteConfirm(item, 'success')}
                okText="Ok"
                cancelText="Cancel"
                placement="topRight"
              >
                <Icon type="delete"  />
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => { this.getById(item) }}> 
                <Icon type="edit"  />
              </a>
            </div>
          ),
        },
    
      ];
 
    return(
            <Form style={{height:'500px',background:'#fff',marginLeft:'100px',marginTop:'20px',marginRight:'300px'}} onSubmit={this.handleSubmit}  id="AdminForm" >
                <Row >
                    <Col span={10} offset={1}>
                        <FormItem style={{marginTop:"40px"}} label="Name">
                            {getFieldDecorator('name', { initialValue: AdminData.name,
                                rules: [  
                                    { required: true, message: 'Please Enter Name!' },
                                    { pattern: /^[a-zA-Z ]+$/, message: 'Name must be alhabets only!' },
                                    { max: 30, message: 'Name 30 characters only!' }
                                ]                      
                            })(
                            <Input placeholder="Enter Name"  type="text" name="name"  />
                            )}
                        </FormItem>

                    </Col>

                    <Col  span={10} offset={2}>
                        <FormItem style={{marginTop:"40px"}} label="Mobile Number" >
                            {getFieldDecorator('mobile_no', { initialValue: AdminData.mobile_no,
                                rules: [  
                                    { required: true, message: 'Please Enter Mobile Number!' },
                                    { pattern: /^[0-9 ]+$/, message: 'Mobile Number must be numric only!' },
                                    { max: 10, message: 'phone 10 digit only!' }
                                ] 
                            })(
                            <Input placeholder="Enter Mobile No." type="text" name="mobile_no" />
                            )}
                        </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col  span={10} offset={1}>
                        <FormItem label="Email" >
                            {getFieldDecorator('email_id', { initialValue: AdminData.email_id,
                                  rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                  }, {
                                    required: true, message: 'Please input your E-mail!',
                                  }],
                            })(
                            <Input placeholder="Enter Email" type="text" name="email_id" />
                            )}
                        </FormItem>
                    </Col>
                    
                     <Col  span={10} offset={2}>
                        <FormItem label="Password" >
                            {getFieldDecorator('password', {  initialValue: AdminData.password,
                              rules: [ {
                                required:true, message: 'Please input your Password!',
                              }],
                              
                    
                            })(
                            <Input  placeholder="Enter Password" type="text" name="password" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} offset={1}>
                        <FormItem label="Role">
                            {getFieldDecorator('role', {initialValue: AdminData.role,
                
                            enableReinitialize: true,
                            rules: [ {
                                required: true, message: 'Please Select a Role!', 
                              }],
                                                            
                            })(
                            <Select  placeholder="Please Select Role" >
                                <Select.Option value="Event Admin">Event Admin</Select.Option>
                                <Select.Option value="Ticketing">Ticketing</Select.Option>
                                <Select.Option value="Scanning">Scanning</Select.Option>
                                <Select.Option value="Reports">Reports</Select.Option>
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    {(!this.state.visible) && <Col span={1} offset={11}>
                            <Button size="large" onClick = {this.handleSubmit} type="primary">Submit</Button>  
                        </Col>}
                        {(this.state.visible) && <Col span={1} offset={11}>
                            <Button size="large" onClick = {this.handleSubmit} type="primary">Update</Button>  
                        </Col>}
                  
                       
                </Row>
                <div style={{background:'#fff',marginTop: '50px'}}>
                    <Table
                        bordered
                        loading={this.state.loading}
                        columns={tableColumns}
                        dataSource={this.state.UserData}
                        size="small"
                        rowKey="user_id"
                    />
                </div>

            </Form>             
    )
  }
}

const mapStateToProps=(state)=> {
    console.log(state);
    return {
       
        data: state.form.reducerList,
        loading: state.loading.models.form,
        AdminData: state.form.reducerbyId,
      
    }  
 }
/*
export default Form.create()(
    connect(({ form }) => ({
      data: form.reducerList,                   // another way to export
   
    }))(AdminForm),
  );
*/
export default Form.create()(
    connect(mapStateToProps)(AdminForm),
  );