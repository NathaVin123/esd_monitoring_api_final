export const responseSend = async (res: any, type: string, message: any, data?: any ) => {
    let jsonData = {};

    console.log('Response Init');

    let messageType: string = '';
    let success : boolean = false;
    let code : number = 0;

    if(type === 'error') {
        success = false;
        code = 200
        messageType = 'Error : ';
    }else if(type === 'exception') {
        success = false;
        code = 500
        messageType = 'Exception : ';
    } else {
        success = true;
        code = 200
        messageType = 'Success : ';
    }

    if(data)
    {
        jsonData = {
            success : success,
            message : `${messageType} ${JSON.stringify(message)}`,
            data: data
        }
    }
    else
    {
        jsonData = {
            success : success,
            message : `${messageType} ${JSON.stringify(message)}`,
        }
    }


    let response = res.status(code).json(jsonData);

    return response;
}
