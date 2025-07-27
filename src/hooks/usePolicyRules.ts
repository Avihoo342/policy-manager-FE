import { useState, useEffect, useCallback } from 'react';
import { Rule } from '../types/policy';
import * as policyApi from '../api/policyApi';

const PAGE_SIZE = 50;

export const usePolicyRules = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [destnameChangeTerm, setDestNameChangeTerm] = useState('');

  const fetchRules = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const result = await policyApi.fetchPolicies(offset, PAGE_SIZE, 'ruleIndex', searchTerm, destnameChangeTerm);
      setRules(result.data);
      setTotalCount(result.totalCount);
    } catch (err) {
      console.error('Failed to fetch rules:', err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, destnameChangeTerm]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const updateRule = (id: string, changes: Partial<Rule>) => {
    setRules(curr => curr.map(r => (r._id === id ? { ...r, ...changes, isEdited: true } : r)));
  };

const savePolicy = async () => {
  try {
    const newRules = rules.filter(r => r.isNew && r.isEdited && !r.isDeleted);
    const updatedRules = rules.filter(r => !r.isNew && r.isEdited && !r.isDeleted);
    const deletedRules = rules.filter(r => r.isDeleted && !r.isNew);

    for (const newRule of newRules) {
      await policyApi.createPolicy(newRule);
    }

    if (updatedRules.length > 0) {
      await policyApi.updatePolicies(updatedRules);
    }

    for (const rule of deletedRules) {
      await policyApi.deletePolicy(rule._id);
    }

    alert('Changes saved');
    fetchRules();
  } catch (err) {
    console.error('Failed to save policies', err);
    alert('Failed to save policies');
  }
};

  return {
    rules,
    loading,
    page,
    setPage,
    totalCount,
    searchTerm,
    setSearchTerm,
    destnameChangeTerm,
    setDestNameChangeTerm,
    updateRule,
    setRules,
    savePolicy,
    fetchRules,
    PAGE_SIZE,
  };
};