function display() {
    const element = document.getElementsByClassName('hidden')[0];
    if (element) {
        element.style.display = "flex";     
    }
    const overlay = document.getElementById('wrapper_hidden');

    if (overlay) {
        overlay.style.display = "block"; 
    }

    const heading=document.getElementsByClassName('text')[0];

    if(heading){
        heading.style.opacity='0';
    }
}


function exit(){
    const hidden=document.getElementsByClassName('hidden')[0];
    if(hidden){
        hidden.style.display="none";
    }

    const overlay = document.getElementById('wrapper_hidden');

    if (overlay) {
        overlay.style.display = "none"; 
    }

    const heading=document.getElementsByClassName('text')[0];

    if(heading){
        heading.style.opacity='1    ';
    }

}