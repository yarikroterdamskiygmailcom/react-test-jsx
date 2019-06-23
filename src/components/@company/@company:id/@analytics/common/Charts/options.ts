import { Options, SeriesColumnOptions } from 'highcharts'
import _ from 'lodash'
import { GenerateArrayOfDatesType } from 'src/utils/generateArrayOfDates'
import { generateDataForSaldo } from 'src/utils/generateDataForSaldo'
import { income, consumption } from 'src/constants'

import { DataForColumnChartType, DataForPieChart, PieSeriesDataType, SumSaldoDataType, } from './types'

export const columnChartOptions = (
  dataForColumnChart: DataForColumnChartType[],
  arrayOfDates: GenerateArrayOfDatesType,
  titleForColumnChart: string,
): Options => {

  const legendSeries: SeriesColumnOptions[] = _.map(
    dataForColumnChart,
    (v: DataForColumnChartType) => {
      const columnChartData: number[] = Object.keys(arrayOfDates.xAxisValues)
        .reduce((acc: number[], val: string): number[] => {
          v.values[val] ? acc.push(+v.values[val].toFixed(2)) : acc.push(0)
          return acc
        },      [])

      return {
        name: v.name,
        type: 'column',
        data: columnChartData,
      } as SeriesColumnOptions
    })
  const currency = [...new Set(_.map(dataForColumnChart, el => el.currency))]

  return {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      spacingTop: 50,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: titleForColumnChart,
      style: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '18px',
      },
    },
    xAxis: {
      categories: arrayOfDates.xAxisMonths,
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      labels: {
        style: {
          fontSize: '10px',
        },
      },
      stackLabels: {
        enabled: true,
        format: '{total}',
        style: {
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '11px'
        },
        allowOverlap: true,
      },
    },
    legend: {
      x: 0,
      verticalAlign: 'bottom',
      y: 0,
      floating: false,
      backgroundColor: 'transparent',
      borderColor: '#CCC',
      borderWidth: 0,
      shadow: false,
      itemStyle: {
        fontSize: '15px',
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: `{series.name}: {point.y} ${currency}`,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
          color: 'white',
        },
      },
    },
    series: legendSeries,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          title: {
            style: {
              fontSize: '14px',
            }
          },
          legend: {
            layout: 'horizontal',
            symbolHeight: 10,
            align: 'center',
            verticalAlign: 'bottom',
            width: 250,
            itemWidth: 125,
            itemStyle: {
              fontSize: '11px',
            },
          },
          yAxis: {
            stackLabels: {
              style: {
                fontSize: '8px',
              }
            },
            labels: {
              style: {
                fontSize: '8px',
              },
            },
          }
        },
      }],
    },
  }
}

export const pieChartOptions = (
  dataForPieChart: DataForPieChart[],
  titleForPieChart: string
): Options => {

  const pieSeriesData: PieSeriesDataType = _.map(
    dataForPieChart,
    (item: DataForPieChart) => {
      const { y, name, value } = item

      return [
        Number(y.toFixed(3)), name, value.toLocaleString('ru')
      ]
    }
  )

  const sumDataNumber = _.reduce(pieSeriesData, (acc: number, val: (string | number)[]) =>
    acc + Number(String(val[2]).replace(/\s+/g, '').replace(',', '.')),
                                 0)

  const sumData = Number(sumDataNumber.toFixed(2)).toLocaleString('ru')

  const currency = [...new Set(_.map(dataForPieChart, el => el.currency))]

  return {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      spacingTop: 50,
      spacingBottom: 50,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: `${titleForPieChart}: ${sumData} ${currency}`,
      style: {
        color: '#333333',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        size: '100%',
      },
    },
    tooltip: {
      headerFormat: undefined,
      pointFormat: `{point.name}: {point.value} ${currency} ({point.y}%)`,
    },
    series: [
      {
        data: pieSeriesData,
        keys: ['y', 'name', 'value'],
        type: 'pie',
        cursor: 'pointer',
        slicedOffset: 10,
      },
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          title: {
            style: {
              fontSize: '13px',
            },
          },
          chart: {
            spacingTop: 20,
            spacingBottom: 0,
          },
          plotOptions: {
            pie: {
              dataLabels: {
                style: {
                  fontSize: '11px',
                },
                distance: 5,
              },
              size: '50%',
            }
          }
        }
      }]
    },
  }
}

export const saldoLineChartOptions = (
  dataForColumnChart: DataForColumnChartType[],
  arrayOfDates: GenerateArrayOfDatesType,
  titleForLineChart: string
): Options => {

  const incomeDataForColumnChart = _.pickBy(dataForColumnChart, el => el.operationType === income)
  const consumptionDataForColumnChart = _.pickBy(dataForColumnChart, el => el.operationType === consumption)

  const saldoDataIncome = generateDataForSaldo(incomeDataForColumnChart as DataForColumnChartType[], arrayOfDates)
  const saldoDataConsumption = generateDataForSaldo(consumptionDataForColumnChart as DataForColumnChartType[], arrayOfDates)

  const saldoData = _.map(saldoDataIncome, (num: number, idx: number) => {
    const value = num - saldoDataConsumption[idx]
    return {
      y: +value.toFixed(3),
      marker: {
        fillColor: value < 0 ? '#FD0715' : undefined,
        radius: value < 0 ? Number('6') : 4,
      },
    }
  })

  const sumSaldoData = _.reduce(saldoData, (acc: number, val: SumSaldoDataType) => acc + val.y, 0)

  const currency = [...new Set(_.map(dataForColumnChart, el => el.currency))]

  return {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      spacingTop: 50,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: `${titleForLineChart}: ${sumSaldoData.toLocaleString('ru')} ${currency}`,
      style: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: arrayOfDates.xAxisMonths,
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      }
    },
    legend: {
      layout: 'vertical',
      backgroundColor: 'transparent',
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        fontSize: '15px',
      },
    },

    plotOptions: {
      line: {
        color: '#E3D060',
      }
    },

    series: [{
      type: 'line',
      name: titleForLineChart,
      data: saldoData,
    }],
    tooltip: {
      headerFormat: '<table><b>{point.x}</b>',
      pointFormat: '<tr><td style="padding:0">{series.name}: </td>' +
        `<td style="padding:0">{point.y:,.2f} ${currency}</td></tr>`,
      footerFormat: '</table>',
      useHTML: true
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          title: {
            style: {
              fontSize: '14px',
            }
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
              fontSize: '11px',
            },
          },
          yAxis: {
            labels: {
              style: {
                fontSize: '8px',
              }
            }
          }
        },
      }]
    }
  }
}

export const saldoColumnChartOptions = (
  dataForColumnChart: DataForColumnChartType[],
  arrayOfDates: GenerateArrayOfDatesType,
  labels: string[],
): Options => {

  const incomeDataForColumnChart = _.pickBy(dataForColumnChart, el => el.operationType === income)
  const consumptionDataForColumnChart = _.pickBy(dataForColumnChart, el => el.operationType === consumption)

  const saldoDataIncome = generateDataForSaldo(incomeDataForColumnChart as DataForColumnChartType[], arrayOfDates)
  const saldoDataConsumption = (generateDataForSaldo(consumptionDataForColumnChart as DataForColumnChartType[], arrayOfDates))

  const currency = [...new Set(_.map(dataForColumnChart, el => el.currency))]

  return {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      spacingTop: 50,
      spacingBottom: 50,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
      style: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: arrayOfDates.xAxisMonths,
      crosshair: true,
      labels: {
        style: {
          fontSize: '10px',
        },
        autoRotation: [0],
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    legend: {
      x: 0,
      verticalAlign: 'bottom',
      y: 0,
      floating: false,
      backgroundColor: 'transparent',
      borderColor: '#CCC',
      borderWidth: 0,
      shadow: false,
      itemStyle: {
        fontSize: '15px',
      },
    },
    tooltip: {
      headerFormat: '<table>',
      pointFormat: '<tr><td style="padding:0">{series.name}: </td>' +
        `<td style="padding:0">{point.y:,.2f} ${currency}</td></tr>`,
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    series: [{
      name: labels[0],
      data: saldoDataIncome,
      color: '#AAFD9C',

    }, {
      name: labels[1],
      data: saldoDataConsumption,
      color: '#FE7374',
    }] as SeriesColumnOptions[],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          title: {
            style: {
              fontSize: '14px',
            }
          },
          legend: {
            layout: 'horizontal',
            symbolHeight: 10,
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
              fontSize: '11px',
            },
          },
          xAxis: {
            labels: {
              autoRotation: [Number('-45')],
            }
          },
          yAxis: {
            stackLabels: {
              style: {
                fontSize: '8px',
              }
            },
            labels: {
              style: {
                fontSize: '8px',
              }
            }
          }
        }
      }],
    }
  }
}
