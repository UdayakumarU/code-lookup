const CONSTANTS ={
    ID:{
        PARAM_1_ID:"param1",
        PARAM_2_ID:"param2",
        PARAM_3_ID:"param3",
        RESPONSE_CONTAINER_ID:"response-container"
    },
    CLASSNAME:{
        SUCCESS_CARD_CLASSES: "card card-success text-response",
        ERROR_CARD_CLASSES: "card card-error text-response"
    },
    ATTRIBUTE:{
        CLASS:"class"
    },
    ELEMENT:{
        DIV:"div"
    },
    ERROR_MESSSAGE:{
        INVALID_INPUT:"Invalid input"
    }
};


/* =================== Main Logic ===================*/
function getDataset(){
    return {
        A:{
            A:{A:0, B:0, C:0, D:0, E:0},
            B:{A:1, B:0, C:1, D:1, E:0}
        },
        B:{
            A:{A:1, B:0, C:1, D:1, E:1},
            B:{A:1, B:0, C:1, D:1, E:1}
        },
        C:{
            A:{A:0, B:0, C:0, D:0, E:0},
            B:{A:1, B:0, C:0, D:1, E:1}
        }
    }
};


function validateParams(params, dataset){
    const [ param1, param2, param3 ] = params;
    if(!Object.keys(dataset).includes(param1)){
        return false;
    }
    if(!Object.keys(dataset[param1]).includes(param2)){
        return false;
    }
    if(!Object.keys(dataset[param1][param2]).includes(param3)){
        return false;
    }
    return true;
}


function getCodeFromDataset(...params){
    const [ param1, param2, param3 ] = params;
    const dataset = getDataset();
    if(!validateParams(params, dataset)){
        throw new Error(CONSTANTS.ERROR_MESSSAGE.INVALID_INPUT);
    }
    return dataset[param1][param2][param3];
}


/*================= DOM Manipulation ===============*/
function mountResponse(response, className){
    const responseContainer = document.getElementById(CONSTANTS.ID.RESPONSE_CONTAINER_ID);
    const errorResponseElement = document.createElement(CONSTANTS.ELEMENT.DIV);
    errorResponseElement.setAttribute(CONSTANTS.ATTRIBUTE.CLASS, className);
    errorResponseElement.innerText = response;
    responseContainer.appendChild(errorResponseElement);
}


function unmountResponse(){
    const responseContainer = document.getElementById(CONSTANTS.ID.RESPONSE_CONTAINER_ID);
    if(responseContainer.hasChildNodes()){
        responseContainer.replaceChildren();
    }
}


function handleClick(){
    const param1 = document.getElementById(CONSTANTS.ID.PARAM_1_ID).value;
    const param2 = document.getElementById(CONSTANTS.ID.PARAM_2_ID).value;
    const param3 = document.getElementById(CONSTANTS.ID.PARAM_3_ID).value;

    unmountResponse();
    try {
        const response = getCodeFromDataset(param1, param2, param3);
        mountResponse(response, CONSTANTS.CLASSNAME.SUCCESS_CARD_CLASSES);
    } 
    catch (error) {
        const {message} = error;
        mountResponse(message, CONSTANTS.CLASSNAME.ERROR_CARD_CLASSES);
    }
}