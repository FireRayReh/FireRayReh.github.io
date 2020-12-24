let header = ["Country", "Year", "fertility", "life", "population", "child_mortality", "gdp", "region"];
var _DATA = null;
var data_loaded = false;

const main =
{
    load_csv: function (url) {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "text",
            success: function (data) {
                $( "#loading-text" ).empty();
                $( "#loading-text" ).text( "Data downloaded successfully" );
                main.parse_csv(data);
            }
        });
    },
    parse_csv: function (allText) {
        $( "#loading-text" ).empty();
        $( "#loading-text" ).text( "Parsing Data" );
        var lines = allText.split(/\r\n|\n/);
        lines.shift(); lines.pop();
        var data = [];
        lines.forEach(line => {
            let elements = line.split(";");
            let json = {}
            for (let j = 0; j < elements.length; j++) {
                if (header[j] === "Country" || header[j] === "region") {
                    json[header[j]] = elements[j].replace('"' , "");
                }
                else {
                    json[header[j]] = Number(elements[j])
                }
            }
            data.push(json)
        });
        $( "#loading-text" ).empty();
        $( "#loading-text" ).text( "Data parsed successfully");
        _DATA = data;
        data_loaded = true;
        $( "#loading-text" ).empty();
        $( "#loading-text" ).text( "Saving data locally");
        localStorage.clear();
        localStorage.setItem("_DATA", JSON.stringify(_DATA));
        $( "#loading-text" ).empty();
        $( "#loading-text" ).text( 'Redirecting to dashboard');
        $( "#loading-text" ).append( '<br />');//
        $( "#loading-text" ).append( '<br />');//
        $( "#loading-text" ).append( '<a href="./dashboard.html" class="btn btn-outline-dark"> redirect to dashboard</a>');//
        setTimeout(main.redirect, 8000);
    },
    get_data: function () {
        if (data_loaded) {
            return _DATA;
        }
        return null;
    },
    redirect: function () {
        window.location.replace("./dashboard.html");

    }
}