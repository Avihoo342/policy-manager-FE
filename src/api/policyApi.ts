import api from './api';
import { Rule } from '../types/policy';

export const fetchPolicies = async (
  offset: number,
  limit: number,
  sortBy: string,
  search: string,
  destination: string
) => {
  try {
    const res = await api.get('/policies', {
      params: {
        offset,
        limit,
        sort: sortBy,
        sourceName: search,
        destinationName: destination
      },
    });

    const data = Array.isArray(res.data) ? res.data : res.data.data || [];
    const totalCount = res.data.totalCount ?? 0;

    return { data, totalCount };
  } catch (error) {
    console.error('Failed to fetch policies:', error);
    throw error;
  }
};

export const createPolicy = async (policy: Rule) => {
  try {
    const res = await api.post('/policies', policy);
    return res.data;
  } catch (error) {
    console.error('Failed to create policy:', error);
    throw error;
  }
};

export const updatePolicies = async (updates: Rule[]) => {
  try {
    const res = await api.put('/policies/bulk', updates);
    return res.data;
  } catch (error) {
    console.error('Failed to update policies:', error);
    throw error;
  }
};

export const reorderPolicies = async () => {
  try {
    const res = await api.post('/policies/reorder');
    return res.data;
  } catch (error) {
    console.error('Failed to reorder policies:', error);
    throw error;
  }
};

export const deletePolicy = async (_id: string) => {
  try {
    const res = await api.delete(`/policies/${_id}`);
    return res.data;
  } catch (error) {
    console.error('Failed to delete policy:', error);
    throw error;
  }
};