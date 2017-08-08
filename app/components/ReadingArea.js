import React from 'react';
import Style from './markdownLib';
export default class Reader extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let style = new Style();
    let text = {__html: style.styleText(this.props.text)};
    return (
      <div className="col">
        <div dangerouslySetInnerHTML={text}/>
      </div>
    )
  }
}