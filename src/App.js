import React, { Component, useState } from 'react';
var Tesseract = window.Tesseract
var translate = require('yandex-translate')('SUA YANDEX API AQUI');


/*
  let img = new Image()
  var resote = "aaa"
  img.src = './images/teste.png'
  img.onload = function(){

    Tesseract.recognize(img, {
      lang: 'jpn'
    }).progress((progress) => {
      console.log(progress, '$$$$')

      if(progress.status === 'recognizing.text'){
        console.log(`${progress.progress*100}%`)
      }
    }).then((result) => {
      console.log(result, '$$$$')
      resote = result.text
    })
  }
*/



export default function app(){
  const [resultado, setResultado] = useState(0)
  

  //EXTRAINDO TEXTO DA IMAGEM
  let img = new Image()
  img.src = './images/teste.png'
  img.onload = function(){

    Tesseract.recognize(img, {
      lang: 'jpn'
    }).progress((progress) => {
      console.log(progress, '$$$$')

      if(progress.status === 'recognizing.text'){
        console.log(`${progress.progress*100}%`)
      }
    }).then((result) => {
      console.log(result, '$$$$')
      translate.translate(result.text, { to: 'pt' }, function(err, res) {
        setResultado(res.text)
      })
      
    })
  }




  /*
  setTimeout(function(){
    setCount(count + 1)
  }, 1000)
  console.log(count)
  */
  return (
    <div>
      <p>{resultado}</p>
    </div>
  )
}