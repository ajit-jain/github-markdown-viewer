import React from 'react';
export default class Writer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text : ` Heading
                    =======

                    Sub-heading
                    -----------
                    
                    ### Another deeper heading
                    Text attributes *italic*, **bold**, 
                    \`monospace\`, ~~strikethrough~~ .

                    Shopping list:

                      * apples
                      * oranges
                      * pears  
                    Numbered list:  

                      1. apples
                      2. oranges
                      3. pears

                     The rain---not the reign---in
                    Spain.

                    *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`
    }
  }
  handleChange(e){
      console.log("Entered",e.target.value);
      let value = e.target.value;
      this.setState(()=>{
        this.props.changedText(value);
        return {text: value}
      });
      
  }
  render(){
    return (
      <div className="col">
        <textarea value={this.state.text} onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}