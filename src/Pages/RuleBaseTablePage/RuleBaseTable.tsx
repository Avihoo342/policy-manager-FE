import {
  Paper, Typography, Box, TextField, Button,
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import RuleRow from '../../components/RuleRow';
import { usePolicyRules } from '../../hooks/usePolicyRules';
import { Action, Rule } from '../../types/policy';

const RuleBaseTablePage = () => {
  const {
    rules, setRules, updateRule,
    page, setPage, totalCount, PAGE_SIZE,
    searchTerm, setSearchTerm,
    savePolicy, loading,
  } = usePolicyRules();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updated = [...rules];
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);

    updated.forEach((rule, idx) => {
      rule.ruleIndex = idx + 1;
      rule.isEdited = true;
    });

    setRules(updated);
  };

  const addNewRule = () => {
    const newRule: Rule = {
      _id: `${Date.now()}`,
      ruleIndex: rules.length + 1,
      name: '',
      action: 'Allow' as Action,
      sources: [],
      destinations: [],
      isNew: true,
      isEdited: true,
    };
    setRules(prev => [newRule, ...prev]);
  };

  const deleteRule = (id: string) => updateRule(id, { isDeleted: true, isEdited: true });

  const addSource = (id: string) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    updateRule(id, { sources: [...rule.sources, { name: '', email: '' }] });
  };

  const removeSource = (id: string, i: number) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    updateRule(id, { sources: rule.sources.filter((_, index) => index !== i) });
  };

  const addDestination = (id: string) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    updateRule(id, { destinations: [...rule.destinations, { name: '', address: '' }] });
  };

  const removeDestination = (id: string, i: number) => {
    const rule = rules.find(r => r._id === id);
    if (!rule) return;
    updateRule(id, { destinations: rule.destinations.filter((_, index) => index !== i) });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>Policy Rules</Typography>

      <Box mb={2} display="flex" gap={2}>
        <TextField
          label="Search by Source Name"
          size="small"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={addNewRule}>Add New Rule</Button>
        <Button variant="contained" onClick={savePolicy}>Save Policy</Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rules-droppable">
          {provided => (
            <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Sources</TableCell>
                    <TableCell>Destinations</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {rules.filter(rule => !rule.isDeleted).map((rule, idx) => (
                  <Draggable key={rule._id} draggableId={rule._id} index={idx}>
                    {providedDrag => (
                      <RuleRow
                        rule={rule}
                        index={idx}
                        updateRule={updateRule}
                        deleteRule={deleteRule}
                        addSource={addSource}
                        removeSource={removeSource}
                        addDestination={addDestination}
                        removeDestination={removeDestination}
                        dragProvided={providedDrag}
                      />
                    )}
                  </Draggable>
                ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Typography>
          Page {page} / {Math.ceil(totalCount / PAGE_SIZE)} (Total: {totalCount})
        </Typography>
        <Box>
          <Button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <Button disabled={page >= Math.ceil(totalCount / PAGE_SIZE)} onClick={() => setPage(p => p + 1)}>Next</Button>
        </Box>
      </Box>

      {loading && <Typography>Loading...</Typography>}
    </Paper>
  );
};

export default RuleBaseTablePage;
