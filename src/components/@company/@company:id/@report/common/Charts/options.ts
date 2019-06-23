import { Options } from 'highcharts'
import _ from 'lodash'
import {
  DataForColumnChartType,
  SumSaldoDataType,
} from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { generateDataForSaldo } from 'src/utils/generateDataForSaldo'
import { GenerateArrayOfDatesType } from 'src/utils/generateArrayOfDates'
import { income, consumption } from 'src/constants'

import { NewSaldoDataType } from './types'

export const reportLineChartOptions = (
  dataForColumnChart: DataForColumnChartType[],
  arrayOfDates: GenerateArrayOfDatesType,
  labels: { income: string, consumption: string, saldo: string },
) => {
  const incomeDataForColumnChart = _.pickBy(dataForColumnChart, el => el.operationType === income)
  const consumptionDataForColumnChart = _.pickBy(dataForColumnChart, el => el.operationType === consumption)

  const saldoDataIncome = generateDataForSaldo(incomeDataForColumnChart as DataForColumnChartType[], arrayOfDates)
  const saldoDataConsumption = (generateDataForSaldo(consumptionDataForColumnChart as DataForColumnChartType[], arrayOfDates))

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

  const allData = (): NewSaldoDataType | undefined => {
    if (
      saldoDataIncome && saldoDataIncome && arrayOfDates.xAxisMonthsAndYear &&
      saldoDataIncome.length > 0 &&
      saldoDataConsumption.length > 0 &&
      arrayOfDates.xAxisMonthsAndYear.length > 0
    ) {
      const newSaldoDataIncome: number[] = []
      const newSaldoDataConsumption: number[] = []
      const newSaldoData: SumSaldoDataType[] = []
      const newArrayOfDates: string[] = []
      const newObjOfDates: { [key: string]: string } = {}

      saldoData.forEach((el, key) => {
        if (el.y !== 0) {
          newSaldoDataIncome.push(saldoDataIncome[key])
          newSaldoDataConsumption.push(saldoDataConsumption[key])
          newSaldoData.push(saldoData[key])
          newArrayOfDates.push(arrayOfDates.xAxisMonthsAndYear[key])
          newObjOfDates[Object.keys(arrayOfDates.xAxisValues)[key]] = arrayOfDates.xAxisMonthsAndYear[key]
        }
      })

      return {
        newSaldoDataIncome,
        newSaldoDataConsumption,
        newSaldoData,
        newArrayOfDates,
        newObjOfDates
      }
    }
  }

  const allDataObj = allData()
  const sumSaldoData = _.reduce(saldoData, (acc: number, val: SumSaldoDataType) => acc + val.y, 0)

  const currency = [...new Set(_.map(dataForColumnChart, el => el.currency))]

  return {
    sumSaldoData,
    allDataObj,
    options: {
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        spacingTop: 20,
      },
      credits: {
        enabled: false,
      },
      colors: ['#8BE580', '#EA5759', '#DCCB5D'],
      title: {
        text: '',
      },
      xAxis: {
        categories: allDataObj && allDataObj.newArrayOfDates,
        labels: {
          style: {
            fontSize: '10px',
          },
        },
        ordinal: true,
      },
      yAxis: {
        title: {
          text: '',
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
          fontSize: '15px',
        },
      },
      series: [{
        type: 'line',
        name: labels.income,
        data: allDataObj && allDataObj.newSaldoDataIncome,
        marker: {
          symbol: 'square'
        }
      }, {
        type: 'line',
        name: labels.consumption,
        data: allDataObj && allDataObj.newSaldoDataConsumption,
        marker: {
          symbol: 'triangle'
        }
      },
        {
          type: 'line',
          name: labels.saldo,
          data: allDataObj && allDataObj.newSaldoData,
          marker: {
            symbol: 'circle'
          }
        }],
      tooltip: {
        headerFormat: '<table><b>{point.x}</b>',
        pointFormat: '<tr><td style="padding:0">{series.name}: </td>' +
          `<td style="padding:0">{point.y:,.2f} ${currency}</td></tr>`,
        footerFormat: '</table>',
        shared: true,
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
                },
              },
            },
            xAxis: {
              labels: {
                style: {
                  fontSize: '8px',
                },
              },
            },
          },
        }]
      }
    } as Options,
  }
}
