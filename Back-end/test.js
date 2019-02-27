var cmd=require('node-cmd')

cmd.get(
    "$env:GOOGLE_APPLICATION_CREDENTIALS=\"C:/Development/Workroom/SoftwareEngineering/Backend/googleAPi2.json\"",
    function(err, data, stderr){
        console.log('doing authen google api: ',stderr)
    }
);