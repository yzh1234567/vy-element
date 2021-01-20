export default{
    name:'vyRender',
    componentName:'vyRender',
    functional:true,
    props:{
        render:Function,
    },
    render:(h,content)=>{
        return content.props.render(h)
    }
}