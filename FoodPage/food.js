async function getata(){

    const data = document.getElementById('fetchdata').value

    const payload  ={
        data : data
    }

    try {
        const response = await fetch('http://localhost:3005/Food', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(payload)  
        });

        var result = await response.json();
        if (response.ok) {
            console.log(result)
            alert('found');
        } else {
            alert('not found');
        }
        const output=document.getElementsByClassName('output');
        output.textContent=result.json();
    } //catch (error) {
        //alert('Error occured');
    //}
    finally{

    }
}

