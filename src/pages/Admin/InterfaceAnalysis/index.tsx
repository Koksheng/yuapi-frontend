import {
  PageContainer, useDeepCompareEffect,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { getAnalysisListTopInvokeInterfaceInfo } from '@/services/yuapi-backend/analysis';

/**
 * 接口分析
 * @returns 
 */
const InterfaceAnalysis: React.FC = () => {

    const [data, setData] = useState<API.InterfaceInfoWithTotalNumResponseListBaseResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        try{
            getAnalysisListTopInvokeInterfaceInfo().then(res => {
                if(res.data){
                    setData(res.data);
                }
            })
        } catch(e: any){

        }
    },[])

    // 映射 { value: 1048, name: 'Search Engine' },
    const chartData = data.map(item => {
        return{
            value: item.totalNum,
            name: item.name,
        }
    })

    const option = {
        title: {
          text: 'Top 3 Highest Invoke Interface',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      
      
  return (
    <PageContainer>
    <ReactECharts loadingOption={{showLoading: loading}} option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
