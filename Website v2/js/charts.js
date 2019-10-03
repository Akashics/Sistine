Highcharts.theme = {
    colors: ['#DDDF0D', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        borderColor: '#000000',
        borderWidth: 2,
        className: 'dark-container',
        plotBackgroundColor: 'rgba(255, 255, 255, .1)',
        plotBorderColor: '#CCCCCC',
        plotBorderWidth: 1
    },
    title: {
        style: {
            color: '#C0C0C0',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    xAxis: {
        gridLineColor: '#333333',
        gridLineWidth: 1,
        labels: {
            style: {
                color: '#A0A0A0'
            }
        },
        lineColor: '#A0A0A0',
        tickColor: '#A0A0A0',
        title: {
            style: {
                color: '#CCC',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'

            }
        }
    },
    yAxis: {
        gridLineColor: '#333333',
        labels: {
            style: {
                color: '#A0A0A0'
            }
        },
        lineColor: '#A0A0A0',
        minorTickInterval: null,
        tickColor: '#A0A0A0',
        tickWidth: 1,
        title: {
            style: {
                color: '#CCC',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        style: {
            color: '#F0F0F0'
        }
    },
    toolbar: {
        itemStyle: {
            color: 'silver'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                color: '#CCC'
            },
            marker: {
                lineColor: '#333'
            }
        },
        spline: {
            marker: {
                lineColor: '#333'
            }
        },
        scatter: {
            marker: {
                lineColor: '#333'
            }
        },
        candlestick: {
            lineColor: 'white'
        }
    },
    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: '#A0A0A0'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#444'
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#CCC'
        }
    },

    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            hoverSymbolStroke: '#FFFFFF',
            theme: {
                fill: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0.4, '#606060'],
                        [0.6, '#333333']
                    ]
                },
                stroke: '#000000'
            }
        }
    },

    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0.4, '#888'],
                    [0.6, '#555']
                ]
            },
            stroke: '#000000',
            style: {
                color: '#CCC',
                fontWeight: 'bold'
            },
            states: {
                hover: {
                    fill: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0.4, '#BBB'],
                            [0.6, '#888']
                        ]
                    },
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0.1, '#000'],
                            [0.3, '#333']
                        ]
                    },
                    stroke: '#000000',
                    style: {
                        color: 'yellow'
                    }
                }
            }
        },
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },

    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(16, 16, 16, 0.5)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        }
    },

    scrollbar: {
        barBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
                [0.4, '#888'],
                [0.6, '#555']
            ]
        },
        barBorderColor: '#CCC',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
                [0.4, '#888'],
                [0.6, '#555']
            ]
        },
        buttonBorderColor: '#CCC',
        rifleColor: '#FFF',
        trackBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
                [0, '#000'],
                [1, '#333']
            ]
        },
        trackBorderColor: '#666'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: 'rgb(35, 35, 70)',
    dataLabelsColor: '#444',
    textColor: '#C0C0C0',
    maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

let now = new Date();
let commandUsage = Highcharts.chart('commandUsage', {
    chart: {
        events: {
            load: requestData
        }
    },

    title: {
        text: null
    },

    credits: {
        enabled: false
    },

    xAxis: {
        type: 'datetime'
    },

    yAxis: {
        title: {
            text: null
        },
        allowDecimals: false
    },

    plotOptions: {
        series: {
            pointStart: now.setHours(now.getHours() - 1),
            pointInterval: 60 * 1000
        }
    },

    series: [{
        name: 'Commands Per Minute',
        color: '#2C2F33'
    },
    {
        name: 'Messages Per Minute',
        color: '#3498DB'
    }

    ],

    navigation: {
        buttonOptions: {
            enabled: false
        }
    }

});
let commandUsage2 = Highcharts.chart('commandUsage2', {
    chart: {
        events: {
            load: requestRam
        }
    },

    title: {
        text: null
    },

    credits: {
        enabled: false
    },

    xAxis: {
        type: 'datetime'
    },

    yAxis: {
        title: {
            text: null
        }
    },
    plotOptions: {
        series: {
            pointStart: now.setHours(now.getHours() - 24),
            pointInterval: 24 * 60 * 1000
        }
    },

    series: [{
        name: 'RAM Usage Per Minute (MB)',
        color: '#2C2F33'
    },
    {
        name: 'CPU Usage Per Minute (%)',
        color: '#3498DB'
    }],

    navigation: {
        buttonOptions: {
            enabled: false
        }
    }

});

function requestData() {
    $.ajax({
        url: 'https://api.sistine.moe/application',
        success: function (point) {
            commandUsage.series[0].setData(point.health.cmds);
            commandUsage.series[1].setData(point.health.mpm);

            $('#guilds').text(point.guilds.toLocaleString());
            $('#voice').text(point.channels.voiceChannels);
            $('#text').text(point.channels.textChannels.toLocaleString());
            $('#users').text(point.users.toLocaleString());

            $('#messages').text(point.messages.toLocaleString());
            $('#executions').text(point.executions.toLocaleString());
            $('#ping').text(point.latency.ping.toLocaleString() + 'ms');
            $('#uptime').text(Math.floor((point.uptime / 3600000) % 24).toLocaleString() + ' hours');

            $('#cpu').text(point.health.cpu[59].toLocaleString() + '%');
            $('#ram').text(point.health.ram.used[59].toLocaleString() + 'MB');
            $('#cmds').text(point.health.cmds[59].toLocaleString());
            $('#mpm').text(point.health.mpm[59].toLocaleString());

            setTimeout(requestData, 60000);
        },
        cache: false
    });
}

function requestRam() {
    $.ajax({
        url: 'https://api.sistine.moe/application',
        success: function (point) {
            commandUsage2.series[0].setData(point.health.ram.used);
            commandUsage2.series[1].setData(point.health.cpu);
            setTimeout(requestRam, 60000);
        },
        cache: false
    });
}
