module.exports = function(sequelize, DataType){
    
        return sequelize.define("todo",{
        description :{
          type:  DataType.STRING,
          allowNull: false,
        },
         completed:{
             type:  DataType.BOOLEAN,
             allowNull:false,
             defaultValue:false
         }
    });
    
}