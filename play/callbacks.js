const getUser = (id, callback) => {
    const user = {
        id: id,
        name: 'zz',
    };
    setTimeout(() => {
        callback(user);
         console.log('Inside the function', callback(user));
    }, 3000)
    
}

getUser(30, (userObject) => {
    console.log('Outside the function', userObject);
    return 1;
});