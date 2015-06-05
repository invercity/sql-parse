/**
 * Created by Andriy Ermolenko on 03.06.15.
 */

/**
 * Recursive parse WHERE
 * @param tokens
 */
function detectLev(tokens) {
    // brackets
    var open = '(';
    var close = ')';
    // result object
    var result = [];
    // temp obj
    var current = tokens;
    // find position of start br
    while (current.indexOf(open) != -1) {
        var andIndex = current.indexOf('and');
        var orIndex = current.indexOf('or');
        //console.log('got: ' + current);
        var index = current.indexOf(open);
        var j = index;
        var all = 1;
        while ((all != 0) && (j < current.length)) {
            j++;
            if (current[j] == open) all++;
            if (current[j] == close) all--;
        }
        if (j == current.length) {
            //console.log('error');
            //console.log(current);
            current = [];
            break;
        }
        else {
            // get a sub-array except brackets
            var send = current.slice(index + 1, j);
            //console.log('send: ' + send);
            if ((andIndex != -1) && (orIndex))
            result.push({
                link: detectLev(send)
            });
            current = current.slice(j + 1);
            if (current[0] == 'and' || current[0] == 'or') result.push({
                token: current[0]
            });
            //console.log('current after slice: ' + current);
        }
    }
    // if there are something without brackets
    if (current.length > 0) {
        result.push({
            value: current
        });
    }
    return result;
}

var sql = 'where ( ( x > 6 ) and ( y < 7 ) and ( z > 1 ) )'.split(' ');

console.log(JSON.stringify(detectLev(sql)));