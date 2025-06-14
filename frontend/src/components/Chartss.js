import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { sortCategoryWise } from '../utils/seperator';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export function PieChart({ entries }) {
  // Partition by category for income and expense
  const incomeEntries = entries.filter(e => e.type === 'income');
  const expenseEntries = entries.filter(e => e.type === 'expense');

  // Get unique categories
  const incomeCategories = [...new Set(incomeEntries.map(e => e.category))];
  const expenseCategories = [...new Set(expenseEntries.map(e => e.category))];

  // Sum amounts by category
  const incomeData = incomeCategories.map(cat => incomeEntries.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0));
  const expenseData = expenseCategories.map(cat => expenseEntries.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0));

  // Color palettes
  const incomeColors = [
    '#7ed957', '#4ecdc4', '#36a2eb', '#b5ead7', '#f7b801', '#f4845f', '#43aa8b', '#577590', '#f6d186', '#f67280'
  ];
  const expenseColors = [
    '#ff6961', '#ffb347', '#ffcccb', '#b19cd9', '#cdb4db', '#f28482', '#f6bd60', '#84a59d', '#f7ede2', '#f5cac3'
  ];

  const incomeChartData = {
    labels: incomeCategories,
    datasets: [{
      data: incomeData,
      backgroundColor: incomeColors.slice(0, incomeCategories.length),
    }]
  };
  const expenseChartData = {
    labels: expenseCategories,
    datasets: [{
      data: expenseData,
      backgroundColor: expenseColors.slice(0, expenseCategories.length),
    }]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 32, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
      <div style={{ minWidth: 300, maxWidth: 350, margin: '0 12px' }}>
        <h4>Income by Category</h4>
        {incomeCategories.length > 0 ? <Doughnut data={incomeChartData} /> : <div style={{color:'#888'}}>No income data</div>}
      </div>
      <div style={{ minWidth: 300, maxWidth: 350, margin: '0 12px' }}>
        <h4>Expense by Category</h4>
        {expenseCategories.length > 0 ? <Doughnut data={expenseChartData} /> : <div style={{color:'#888'}}>No expense data</div>}
      </div>
    </div>
  );
}

export function BarChart({ entries }) {
  const categories = {};
  entries.forEach(e => {
    if (!categories[e.category]) categories[e.category] = { income: 0, expense: 0 };
    categories[e.category][e.type] += e.amount;
  });
  const labels = Object.keys(categories);
  const incomeData = labels.map(cat => categories[cat].income);
  const expenseData = labels.map(cat => categories[cat].expense);
  
  const data = {
    labels,
    datasets: [
      { 
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(42, 93, 186, 0.7)',
        borderColor: 'rgba(42, 93, 186, 1)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(42, 93, 186, 0.9)'
      },
      { 
        label: 'Expense',
        data: expenseData,
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(231, 76, 60, 0.9)'
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Montserrat', sans-serif",
            size: 12,
            weight: 'bold'
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        bodyFont: {
          family: "'Montserrat', sans-serif"
        },
        titleFont: {
          family: "'Montserrat', sans-serif",
          weight: 'bold'
        },
        padding: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Montserrat', sans-serif"
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: "'Montserrat', sans-serif"
          },
          callback: function(value) {
            return '₹' + value;
          }
        }
      }
    }
  };
  
  return (
    <div style={{ width: '100%', height: 400, margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export function Chartss(props) {
//  console.log(props.exdata)
  // const [expdata ,] = useState(props.exdata);
  // const [totalexp , setTotalexp] = useState([]);
  let categories = ['Grocery', 'Vehicle', 'Shopping', 'Travel', 'Food','Fun','Other'];
  const totalexp = sortCategoryWise(props.exdata , categories);
  // console.log(totalexp)
///////////////////////////////////////////////////////////////////////////
const data = {
  labels: ['Grocery', 'Vehicle', 'Shopping', 'Travel', 'Food','Fun','Other'],
  datasets: [
    {
      label: "Rs",
      data: totalexp,
      backgroundColor: [
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(230, 57, 70,0.4)',
        'rgba(255, 159, 64, 0.4)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(230, 57, 70,1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 2,
    },
  ],
  options: {
    
    plugins: {

     labels: {
          // formatter: function (value, context) {
          //     return context.chart.data.labels[ context.dataIndex ] + ": ₹";
          // },
          // render : 'categories',
          arc : false,
          percision : 1,
          fontSize : 20
      },
  },
  },
}


;

  //////////////////////////////////////////////////////////////////
  return <Doughnut className='w-full h-full' data={data} />;
}

