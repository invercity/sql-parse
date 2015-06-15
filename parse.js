/**
 * Created by Andriy Ermolenko on 27.05.15.
 */

var parser = require('./lib/sqlParser').parse;
var whereParse = require('./lib/sqlParseTool').parseDeepWhere;

var sql = 'SELECT csv_adminAudit.Parameter_Modified, csv_adminAudit.Value' +
' FROM dbo.csv_adminAudit ' +
'where csv_adminAudit.Parameter_Modified = 2 and some = 3';

var sql2 = 'SELECT count(ppa) as aaax, csv_adminAudit.Parameter_Modified, csv_adminAudit.Value' +
    ' FROM dbo.csv_adminAudit ' +
    'where (csv_adminAudit.Parameter_Modified > 2) or (csv_adminAudit.Parameter_Modified < 200)';

var obj = parser(sql);
//console.log(JSON.stringify(obj));
console.log(JSON.stringify(obj[0].where));