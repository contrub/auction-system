import React, {useEffect, useState} from 'react';

import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {styles} from '../../styles/statsStyles';
import Loading from '../../components/Loading';
import StatsService from '../../services/auction/StatsService';

const Stats = () => {
    const [stats, setStats] = useState({ categoryStats: [], bidStats: [], proposalStats: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            StatsService.fetchCategoryStats(),
            StatsService.fetchBidStats(),
            StatsService.fetchProposalStats()
        ])
            .then(([categoryRes, bidRes, proposalRes]) => {
                setStats({
                    categoryStats: categoryRes,
                    bidStats: bidRes,
                    proposalStats: proposalRes
                });
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const renderBarChart = (data, dataKey, barDataKey, barName) => (
        <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={dataKey} interval={0} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={barDataKey} fill="#8884d8" name={barName} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

    if (isLoading) return <Loading />;

    const { categoryStats, bidStats, proposalStats } = stats;

    return (
        <div style={styles.container}>
            <div style={styles.grid}>
                {renderBarChart(categoryStats, 'categoryTitle', 'usageCount', 'Usage Count')}
                {renderBarChart(proposalStats, 'lotTitle', 'proposalsCount', 'Proposal Count')}
                {renderBarChart(bidStats, 'username', 'totalBids', 'Total Bids')}
                {renderBarChart(bidStats, 'username', 'bidsSum', 'Bids Sum')}
            </div>
        </div>
    );
};

export default Stats;
