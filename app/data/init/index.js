if (process.env.NODE_ENV == 'dev') {
    require(__dirname+'/reset')(function () {
        console.log('db reset')
        require(__dirname+'/members')(function () {
            console.log('members added')
            process.exit(0)
        })
    })
}