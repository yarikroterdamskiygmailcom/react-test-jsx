import PL from 'src/assets/images/increased-revenue.png'
import moneyBag from 'src/assets/images/moneyBag.png'
import receivables from 'src/assets/images/receivables.png'
import creditCard from 'src/assets/images/creditCard.png'
import weightBalance from 'src/assets/images/weightBalance.png'
import project from 'src/assets/images/project.png'
import analytics from 'src/assets/images/analytics.png'

export const MIN_PASSWORD_LENGTH = 6
export const MIN_DAYS_LEFT = 5

export const userIconSize = 36

export const fontWeightBold = 500

export const innerWidthCharts = 500

export const tableIconSize = 18

export const iconSize = 20

export const smallIconCheckBox = 21
export const iconCheckBox = 26

export const timeoutRegister = 2000

export const Unauthorized = 401
export const PaymentRequired = 402
export const NotFound = 404

export const smallPerPage = 30
export const centerPerPage = 50
export const bigPerPage = 100

export const rowsPerPageOptions = [smallPerPage, centerPerPage, bigPerPage]

export enum Order {
  asc = 'asc',
  desc = 'desc',
}

export const journalFilter = [
  { value: 'closest', label: 'Журнал' },
  { value: 'all', label: 'План' },
  { value: 'fact', label: 'Факт' },
]

export const analyticsCategory = [
  { value: 'category', label: 'По категориям' },
  { value: 'counterparties', label: 'По контрагентам' },
  { value: 'projects', label: 'По проектам' },
]

export const tableHead = [
  { name: 'date', title: 'Дата' },
  { name: 'operationType', title: 'Тип' },
  { name: 'sum', title: 'Сумма' },
  { name: 'account', title: 'Счет' },
  { name: 'counterparty', title: 'Контрагент' },
  { name: 'category', title: 'Категория' },
  { name: 'projects', title: 'Проект' },
  { name: 'tags', title: 'Доп. инфо' },
]

export const phoneRegex = new RegExp(
  /^([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)$/,
)

export const emailRegex = new RegExp(
// tslint:disable-next-line max-line-length
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
)

export const reportsScene = [
  {
    img: PL,
    title: 'P%L',
    path: 'profit_and_loss_statement',
    description: 'Отчет о прибыли и убытков',
  },
  {
    img: moneyBag,
    title: 'CashFlow',
    path: 'cash_flow',
    description: 'Отчет о движении денежных средств',
  },
  {
    img: receivables,
    title: 'Дебиторка',
    path: 'receivables',
    description: 'Развернутая дебеторская задолженность',
  },
  {
    img: creditCard,
    title: 'Кредиторка',
    path: 'accounts_payable',
    description: 'Развернутая кредиторская задолженность',
  },
  {
    img: weightBalance,
    title: 'Balance',
    path: 'balance',
    description: 'Активы и пассивы компании',
  },
  {
    img: project,
    title: 'Проекты',
    path: 'projects_report',
    description: 'Отчет по проектам',
  },
  {
    img: analytics,
    title: 'Кастомные отчеты',
    path: 'custom_reports',
    description: 'Развернутая дебеторская задолженность'
  },
]

export const FOOTER_LINKS = [
  { text: 'Продукт', url: '#' },
  { text: 'Регистрация', url: '#' },
  { text: 'Команда', url: '#' },
  { text: 'Тарифы', url: '#' },
  { text: 'Блог', url: '#' },
  { text: 'Безопасность', url: '#' },
  { text: 'Стать партнером', url: '#' },
  { text: 'Договор - оферты', url: '#' },
  { text: 'Конфиденциальности', url: '#' },
  { text: 'Контакты', url: '#' },
]

export const CompanyNavigation = [
  { path: 'journal', title: 'Журнал' },
  { path: 'analytics', title: 'Аналитика' },
  { path: 'report', title: 'Отчеты' },
  { path: 'calendar', title: 'Календарь' },
  { path: 'users', title: 'Пользователи' },
  { path: 'settings', title: 'Настройки' },
]

export const headerProjectsLabels = [
  'Проект',
  'Расход',
  'Доход',
  'Прибыль',
  'Рентабельность'
]

export const headerRPLabels = [
  'Контрагент',
  'Сумма',
  '',
]

export const hundredPercents = 100

export const emptyLabels = {
  income: '',
  consumption: '',
  saldo: '',
}

export const income: string = 'income'
export const transfer: string = 'transfer'
export const consumption: string = 'consumption'

export const account: string = 'account'
export const accounts: string = 'accounts'
export const accountTo: string = 'accountTo'
export const accountFrom: string = 'accountFrom'

export const counterparty: string = 'counterparty'
export const counterparties: string = 'counterparties'
export const counterpartyTo: string = 'counterpartyTo'
export const counterpartyFrom: string = 'counterpartyFrom'

export const projects: string = 'projects'
export const projectsTransfer: string = 'projectsTransfer'

export const incomeCategory: string = 'incomeCategory'
export const incomeCategories: string = 'incomeCategories'
export const consumptionCategory: string = 'consumptionCategory'
export const consumptionCategories: string = 'consumptionCategories'

export const tags: string = 'tags'
export const operationsTypes: string = 'operationsTypes'

export const numberForRound = 10

export const projects600Width = 600

export const reportIconSize = 16

export const activesValues = [
  { label: 'Основные средства: ', name: 'firstInputValue' },
  { label: 'Склад: ', name: 'secondInputValue' },
  { label: 'Другие активы', name: 'thirdInputValue' },
]

export const informationLabels = [
  'Показывает реальную рентабельность бизнеса, независимо от движения денег.',
  'Показывает финансовый оборот в компании - все поступления и выплаты. Не показывает прибыль.',
  'Сумма дебиторской задолженности. Помогает контролировать задолженности клиентов за предоставленные услуги.',
  'Сумма кредиторской задолженности. Помогает контролировать ваши задолженности.',
  'Баланс показывает текущую стоимость всех активов в компании. Помогает понять где находится ваша прибыль.',
  'Показывает прибыльность каждого проекта отдельно.',
  'Кастомные отчеты',
]

export const positionsInformation = 'Вы можете настроить доступ к категориям и счётам вашей компании для каждой должности отдельно.'
export const employeesInformation = 'Добавляйте сотрудников, чтобы они могли вносить информацию о финансовых движениях. ' +
'Обратите внимание, что «настройки» и «отчеты» доступны только сотрудникам с доступом «владелец»'
