import { Paper, Typography } from '@mui/material';
import { DragDropContext } from '@hello-pangea/dnd';
import { usePolicyRules } from '../../hooks/usePolicyRules';
import useRuleTableHandlers from '../../hooks/useRuleTableHandlers';
import RuleTable from '../../components/RuleTable';
import ToolbarControls from '../../components/ToolbarControls';
import PaginationControls from '../../components/PaginationControls';

const RuleBaseTablePage = () => {
  const {
    rules, setRules, updateRule,
    page, setPage, totalCount, PAGE_SIZE,
    searchTerm, setSearchTerm, destnameChangeTerm, setDestNameChangeTerm,
    savePolicy, loading
  } = usePolicyRules();

  const {
    onDragEnd,
    addNewRule,
    modifyRule,
    addSource,
    removeSource,
    addDestination,
    removeDestination
  } = useRuleTableHandlers(rules, setRules, updateRule);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>Policy Rules</Typography>

      <ToolbarControls
        destnameChangeTerm={destnameChangeTerm}
        searchTerm={searchTerm}
        onDestChange={setDestNameChangeTerm}
        onSearchChange={setSearchTerm}
        onAddRule={addNewRule}
        onSave={savePolicy}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <RuleTable
          rules={rules}
          modifyRule={modifyRule}
          addSource={addSource}
          removeSource={removeSource}
          addDestination={addDestination}
          removeDestination={removeDestination}
          updateRule={updateRule}
        />
      </DragDropContext>

      <PaginationControls
        page={page}
        totalPages={Math.ceil(totalCount / PAGE_SIZE)}
        totalCount={totalCount}
        onPageChange={setPage}
      />

      {loading && <Typography>Loading...</Typography>}
    </Paper>
  );
};

export default RuleBaseTablePage;
