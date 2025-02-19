export function password(length, smallCheck, capitalCheck, numberCheck, specialCheck) {
    let charSet = "";
    let atLeastOne = [];

    const smallCharSet = "abcdefghijklmnopqrstuvwxyz";
    const capitalCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharSet = "0123456789";
    const specialCharSet = "!@#$%^&*()-_";

    if(smallCheck){
        charSet += smallCharSet;
        atLeastOne.push(smallCharSet);
    }
    if(capitalCheck){
        charSet += capitalCharSet;
        atLeastOne.push(capitalCharSet);
    }
    if(numberCheck){
        charSet += numberCharSet;
        atLeastOne.push(numberCharSet);
    }
    if(specialCheck){
        charSet += specialCharSet;
        atLeastOne.push(specialCharSet);
    }

    // if all boxes unchecked
    if(charSet === ""){
        return "";
    }

    let psswd = "";

    for(let i=0; i<atLeastOne.length; i++){
        let randomIndex = Math.floor(Math.random() * atLeastOne[i].length);
        console.log(randomIndex);
        psswd += atLeastOne[i][randomIndex];
    }
    
    const remainingLength = length - atLeastOne.length;
    // array of remaininglength with random values from 0 to 32-bit
    let randomBytes = new Uint32Array(remainingLength);
    window.crypto.getRandomValues(randomBytes);

    for (let i = 0; i < remainingLength; i++) {
        psswd += charSet[randomBytes[i] % charSet.length]; // Pick a random letter from charSet
    }

    function shuffle(str) {
        let arr = str.split(''); 
        // fisher-yates algo
        for (let i = arr.length-1; i>0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr.join(''); 
    }


    return shuffle(psswd);
}



