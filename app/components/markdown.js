import React from 'react';
import Writer from './WritingArea';
import Reader from './ReadingArea';
export default class MarkDown extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          text: ` Heading
          =======
          Sub-heading
          -----------
                    
          ### Another deeper heading
          Text attributes *italic*, **bold**,\`monospace\`, ~~strikethrough~~ .
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
      handleChanges(text){
        console.log("Text ", text);
        this.setState({
          text:text
        })
      }
      render(){
        return (
            <div className="row">
              <Writer changedText={this.handleChanges.bind(this)} />
              <Reader text={this.state.text} />
            </div>
        );
      }
}
