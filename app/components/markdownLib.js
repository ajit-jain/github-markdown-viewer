export default class Style{
  constructor(){
    this.validators = new Map();
    this.validators.set('#',this.checkForHeadings.bind(this));
  }
  styleText(text){
    text = text.replace(/\n\r?/g,'<br/>')
    console.log(text);
    let lines = text.split('<br/>');
    console.log("lines",lines);
    lines = lines.map((line)=>{
      line = line.trim();
      if(this.isValidatorExist(line[0])) 
        return this.validators.get(line[0])(line);
      line = this.applyFormatRules(line);
      return line+'<br/>';
    })
   
     let str=lines.join('\n');
     str = this.formatMultilines(str); 
     console.log('modified lines',str);
     return str;
  }
  isValidatorExist(prop){
    return this.validators.has(prop);
  }
  checkForHeadings(line){ 
    if(line.match(/(#)\1\1\1\1\1/)) return this.createHeaderTag(line,'h6');
    if(line.match(/(#)\1\1\1\1/)) return this.createHeaderTag(line,'h5');
    if(line.match(/(#)\1\1\1/)) return this.createHeaderTag(line,'h4');
    if(line.match(/(#)\1\1/)) return this.createHeaderTag(line,'h3');
    if(line.match(/(#)\1/)) return this.createHeaderTag(line,'h2');
    if(line.match(/(#)/)) return this.createHeaderTag(line,'h1');
    return line;
  }
  removeValidators(line,validator){
    let regex = new RegExp(`^${validator}{1,}`);
    return line.replace(regex,'');
  }
  createHeaderTag(line,headTag){
    line = this.removeValidators(line,'#');
    line = this.applyFormatRules(line);
    return `<${headTag}>${line}</${headTag}>`
  }
  applyFormatRules(line){
    line = this.applyBold(line);
    line = this.applyItalic(line);
    line = this.applyMonospace(line);
    line = this.applyStrikethrough(line);
    line = this.applyAnchor(line);
    line = this.applyBlockquote(line);
    line = this.horizontalLine(line);
    return line;
  }
  applyBold(line){
    return line.replace(/(\*\*)([^\*]{1,})(\*\*)/g,`<b>$2</b>`)
  }
  applyItalic(line){
    return line.replace(/(\*)([^\*]{1,})(\*)/g,`<i>$2</i>`) 
  }
  applyMonospace(line){
    return line.replace(/(`)(.{1,})(`)/g,`<code>$2</code>`) 
  }
  applyStrikethrough(line){
    return line.replace(/(~~)(.{1,})(~~)/g,`<del>$2</del>`) 
  }
  applyAnchor(line){
    return line.replace(/\[(.{1,})\]\((.{1,})\)/g,`<a href=$2>$1</a>`);
  }
  applyBlockquote(line){ 
    return line.replace(/^(>)(.{1,})/,`<blockquote>$2</blockquote>`);
  }
  horizontalLine(line){
    return line.replace(/^(\*)\1\1\1/,`<hr>`);
  }
  formatMultilines(text){
    text = this.setHeading(text);
    text = this.createList(text);
    text = this.preCodeAdder(text);
    text = this.cleanText(text);
    return text;
  }
  setHeading(text){
    console.log("Text",text);
    text = text.replace(/(\w{1,})(<br\/>|\n){1,}(\={2,}|\-{1,}\={1,})(<br\/>|\n){1,}/mg,`<h1>$1</h1>`);
    text = text.replace(/(\w{1,})(<br\/>|\n){1,}(\-{2,}|\={1,}\-{1,})(<br\/>|\n)/mg,`<h2>$1</h2>`);
    return text;
  }
  createList(text){
   text = text.replace(/^(\*|\+)\s(\w*)(<br\/>|\n){1,}/mg,'<ul><li>$2</li></ul>');
   return text.replace(/^(\d\.)\s(\w*)(<br\/>|\n){1,}/mg,'<ol><li>$2</li></ol>');
  }
  preCodeAdder(text){
    return text.replace(/^(\`\`\`)([<br\/>\n\r\w\s\S\W\d\D]{0,})\1/mg,`<pre><code>$2</code></pre>`);
  }
  cleanText(text){
    text = text.replace(/(<br\/>)(\n|\r)\1/igm,`$1`);
    return text.replace(/(<\/h\d>)(\n|\r){0,}(<br\/>){1,}/igm,`$1`);
  }
}