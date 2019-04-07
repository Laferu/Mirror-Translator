let img = new Image()
img.src = "./images/teste.png"
img.onload = function(){
  console.log('loaded...', '$$$$')

  Tesseract.recognize(img, {
    lang: 'jpn'
  }).progress((progress) => {
    console.log(progress, '$$$$')

    if(progress.status === 'recognizing.text'){
      console.log(`${progress.progress*100}%`)
    }
  }).then((result) => {
    console.log(result, '$$$$')
    this.setState({
      resultado: result.text
    })
  })
}