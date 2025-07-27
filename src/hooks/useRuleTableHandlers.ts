import { Rule } from '../types/policy';

const useRuleTableHandlers = (
  rules: Rule[],
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>,
  updateRule: (id: string, update: Partial<Rule>) => void
) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = [...rules];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setRules(
      reordered.map((rule, idx) => ({
        ...rule,
        ruleIndex: idx + 1,
        isEdited: true,
      }))
    );
  };

  const addNewRule = () => {
    const newRule: Rule = {
      _id: `${Date.now()}`,
      ruleIndex: rules.length + 1,
      name: '',
      action: 'Allow',
      sources: [],
      destinations: [],
      isNew: true,
      isEdited: true,
    };
    setRules(prev => [newRule, ...prev]);
  };

  const modifyRule = (id: string, update: Partial<Rule>) => {
    updateRule(id, update);
  };

  const addSource = (id: string) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    modifyRule(id, { sources: [...rule.sources, { name: '', email: '' }] });
  };

  const removeSource = (id: string, i: number) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    modifyRule(id, { sources: rule.sources.filter((_, idx) => idx !== i) });
  };

  const addDestination = (id: string) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    modifyRule(id, { destinations: [...rule.destinations, { name: '', address: '' }] });
  };

  const removeDestination = (id: string, i: number) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    modifyRule(id, { destinations: rule.destinations.filter((_, idx) => idx !== i) });
  };

  return {
    onDragEnd,
    addNewRule,
    modifyRule,
    addSource,
    removeSource,
    addDestination,
    removeDestination
  };
};

export default useRuleTableHandlers;