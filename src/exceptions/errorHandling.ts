

export const responseSend = async (res: any, type: string, message: any ) => {
    console.log('Response Init');
    
    let messageType: string = '';
    let success : boolean = false;
    let code : number = 0;

    if(type === 'error') {
        success = false;
        code = 500
        messageType = 'Error : ';
    } else {
        success = true;
        code = 200
        messageType = 'Success : ';
    }

    let jsonData = {
        success : success,
        message : `${messageType} ${JSON.stringify(message)}`,
    }

    let response = res.status(code).json(jsonData);

    return response;
}
