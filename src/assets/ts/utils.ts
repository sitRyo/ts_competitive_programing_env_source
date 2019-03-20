export function codeEdit(code: string, input: string) : string {
  let preCode: string = code;
  let value: string = '';
  
  value = `let userinputinputinput = '${input}';\n`;
  if (preCode.search("require('fs').readFileSync('/dev/stdin', 'utf8')") > -1) {
    preCode.replace("require('fs').readFileSync('/dev/stdin', 'utf8')", 'userinputinputinput');
  }
  
  return value + preCode;
}