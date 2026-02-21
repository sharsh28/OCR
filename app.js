const fileSelector = document.querySelector('#start');
const start = document.querySelector('.btn');
const img = document.querySelector('#img')
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');

fileSelector.onchange = () => {
    var file = fileSelector.files[0];
    var imgUrl = window.URL.createObjectURL(new Blob([file],{type: 'image/jpg'}))
    img.src = imgUrl
}

start.onclick = () => {
    textarea.innerHTML = ''
    const rec = new Tesseract.TesseractWorker()
    rec.recognize(fileSelector.files[0])
    .progress(function(response){
        if(response.status == 'recognizing text'){
            progress.innerHTML = response.status + ' '+response.progress
        }
        else {
            progress.innerHTML = response.status
        }
    })
    .then(function(data){
        textarea.innerHTML = data.text
        progress.innerHTML = 'Done'
    }) 
}






// for animation purpose

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));
