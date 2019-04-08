import React, { Component, useState, useEffect } from 'react';
const fs = require('fs');
const Tesseract = window.Tesseract
const translate = require('yandex-translate')('SUA YANDEX API');

let dataURI, video, btn, canvas, ctx

export default function app(){
  const [resultado, setResultado] = useState(0)
  
  useEffect(() => {
    video = document.querySelector("#video")
    video = document.querySelector("#video")
    btn = document.querySelector('#btn')
    navigator.mediaDevices.getUserMedia({
      video:{
          mediaSource: "window"
      }
    }).then(strm => {
      video.srcObject = strm;
      video.play();
    })

    btn.addEventListener('click', async () => {
      canvas = document.createElement('canvas')
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight
      ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      dataURI = canvas.toDataURL('image/jpeg')
      document.querySelector("#base_img").value = dataURI
      

      Tesseract.recognize(dataURI, {
        lang: 'eng'
      }).then((result) => {
        console.log(result, '$$$$')
        translate.translate(result.text, { to: 'pt' }, function(err, res) {
          console.log(res.text)
          setResultado(res.text)
        })
      })
    })
  })

  return (
    <div>
      <p>{resultado}</p>
      <video id="video"></video>
      <input  type="text" id="base_img" name="base_img"/>
			<button type="button" id="btn">Tirar foto e salvar</button>
    </div>
  )

}
