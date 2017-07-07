const min = document.getElementById('min');
const max = document.getElementById('max');
const med = document.getElementById('med');
const median = document.getElementById('median');
const amp = document.getElementById('amp');
const val = document.getElementById('valores');
const desvp = document.getElementById('dp');
const divGrafico = document.getElementsByClassName('boxplot')[0];
document.getElementsByClassName('add')[0].addEventListener('click', function () {
  Dados.valores.push(parseInt(document.getElementById('add').value));
  Dados.valorsemrepetir=semrepetir(Dados.valores);
  Dados.atualizaView();
});
var Dados = {
  valores: [],
  valorsemrepetir: [],
  classes: [["N/C",,,0]],
  get min(){
    return this.valores[0];
  },
  get mediana() {
    return mediana(this.valores);
  },
  get amplitude() {
    return this.max - this.min;
  },
  get max() {
    return this.valores[this.valores.length-1];
  },
  get media() { // média aritmética
    return media(this.valores);
  },
  get dp(){
    return dp(this.valores);
  },
  atualizaView: function () {
    var p=document.querySelectorAll('p')
    var div=document.getElementsByClassName('barra')
    this.valores= this.valores.sort(sortfunction);
    val.value= this.valores;
    max.value= this.max;
    min.value= this.min;
    median.value= this.mediana;
    med.value= this.media;
    amp.value= this.amplitude;
    desvp.value = this.dp;
    if (this.valorsemrepetir.length>=4) {
      desenha(this.valores);
    }
  }
}
function sortfunction(a, b){
  return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
}
function mediana(valor){
  if (valor.length%2==1) {
    return valor[parseInt(valor.length/2)];
  }
  if (valor.length%2==0) {
    return (valor[valor.length/2-1]+valor[parseInt(valor.length/2)])/2;
  }
}
function media(valor){
  for(i=0,a=0;i<valor.length;i++){
    a+=(valor[i]);
}
  var media = a/valor.length;
  return media;
}
function dp(valor){
  for (var i = 0, a=0; i<valor.length; i++) {
    a += Math.pow((valor[i])-media(valor), 2);
  }
  var dp = Math.sqrt(parseInt(a)/valor.length);
  return dp;
}
function semrepetir(valor){
  for	(i=0,a=[];i<valor.length;i++){
	   if	(a.indexOf(valor[i])==-1){
		     a.push(valor[i]);
     }
  }
  return a;
}
function desenha(valor){
  remove();
  var b=quartil(valor);
  b.unshift(valor[0]);
  b.push(valor[valor.length-1]);
  var c=[((b[0]/b[4])*100),(((b[2]-b[1])/b[4])*100),(((b[3]-b[2])/b[4])*100),((b[3]/b[4])*100-100)*-1];
  if (b[0]==0) {
    c[0]=b[1]*100/b[4];
  }
  var p=document.createElement('p');
  p.innerText=b[0];
  divGrafico.appendChild(p)

  p=document.createElement('hr');
  divGrafico.appendChild(p);

  p=document.createElement('div');
  p.classList.add('div');
  p.style.height=`${c[0]}%`
  divGrafico.appendChild(p);

  p=document.createElement('div');
  p.classList.add('dive');
  q=document.createElement('p');
  q.innerText=b[2]+'\n'+b[1];
  p.appendChild(q);
  p.style.height=`${c[1]}%`
  divGrafico.appendChild(p);

  p=document.createElement('div');
  p.classList.add('dive');
  q=document.createElement('p');
  q.innerText=b[3];
  p.appendChild(q);
  p.style.height=`${c[2]}%`
  divGrafico.appendChild(p);

  p=document.createElement('div');
  p.classList.add('div');
  p.style.height=`${c[3]}%`
  divGrafico.appendChild(p);

  p=document.createElement('hr');
  divGrafico.appendChild(p);

  p=document.createElement('p');
  p.innerText=valor[valor.length-1];
  divGrafico.appendChild(p)
}
function quartil(valor){
  a=[,,,];
  if (valor.length%2==1) {
    a[0]=mediana(valor.slice(0,(valor.length/2)));
    a[1]=valor[parseInt(valor.length/2)];
    a[2]=mediana(valor.slice(parseInt(valor.length/2)+1));
  }
  if (valor.length%2==0) {
    a[0]=mediana(valor.slice(0,(valor.length/2)));
    a[1]=(valor[valor.length/2-1]+valor[(valor.length/2)])/2;
    a[2]=mediana(valor.slice(valor.length/2));
  }
  return a;
}
function remove() {
  div=document.getElementsByClassName('boxplot')[0];
  for (var i = div.children.length; i > 0; i--) {
      div.removeChild(div.children[i-1])
  }
}
