//function handler to repeat words
const repeatWords=()=>({
    otp:Math.floor(100000+Math.random()*900000),
    otpExpired:new Date(Date.now()+10*60*1000),
});

//export the functions or class for using functionality globally
export default repeatWords;