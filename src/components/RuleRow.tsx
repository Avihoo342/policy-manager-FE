import React from 'react';
import {
  TableRow, TableCell, TextField, Select, MenuItem, Button, Box,
} from '@mui/material';
import { DraggableProvided } from '@hello-pangea/dnd';
import { Rule } from '../types/policy';

interface Props {
  rule: Rule;
  index: number;
  updateRule: (id: string, changes: Partial<Rule>) => void;
  deleteRule: (id: string) => void;
  addSource: (id: string) => void;
  removeSource: (id: string, index: number) => void;
  addDestination: (id: string) => void;
  removeDestination: (id: string, index: number) => void;
  dragProvided: DraggableProvided;
}

const RuleRow: React.FC<Props> = ({
  rule, updateRule, deleteRule,
  addSource, removeSource, addDestination, removeDestination,
  dragProvided
}) => {
  if (rule.isDeleted) return null;

  return (
    <TableRow
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      {...dragProvided.dragHandleProps}
      hover
    >
      <TableCell>{rule.ruleIndex}</TableCell>
      <TableCell>
        <TextField
          value={rule.name}
          size="small"
          onChange={e => updateRule(rule._id, { name: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Select
          value={rule.action}
          size="small"
          onChange={e => updateRule(rule._id, { action: e.target.value as 'Allow' | 'Block' })}
        >
          <MenuItem value="Allow">Allow</MenuItem>
          <MenuItem value="Block">Block</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        {rule.sources.map((s, i) => (
          <Box key={i} display="flex" gap={1} mb={0.5}>
            <TextField
              label="Name"
              size="small"
              value={s.name}
              onChange={e => {
                const newSources = [...rule.sources];
                newSources[i] = { ...newSources[i], name: e.target.value };
                updateRule(rule._id, { sources: newSources });
              }}
            />
            <TextField
              label="Email"
              size="small"
              value={s.email}
              onChange={e => {
                const newSources = [...rule.sources];
                newSources[i] = { ...newSources[i], email: e.target.value };
                updateRule(rule._id, { sources: newSources });
              }}
            />
            <Button size="small" onClick={() => removeSource(rule._id, i)} color="error">Remove</Button>
          </Box>
        ))}
        <Button size="small" onClick={() => addSource(rule._id)}>+ Add Source</Button>
      </TableCell>
      <TableCell>
        {rule.destinations.map((d, i) => (
          <Box key={i} display="flex" gap={1} mb={0.5}>
            <TextField
              label="Name"
              size="small"
              value={d.name}
              onChange={e => {
                const newDests = [...rule.destinations];
                newDests[i] = { ...newDests[i], name: e.target.value };
                updateRule(rule._id, { destinations: newDests });
              }}
            />
            <TextField
              label="Address"
              size="small"
              value={d.address}
              onChange={e => {
                const newDests = [...rule.destinations];
                newDests[i] = { ...newDests[i], address: e.target.value };
                updateRule(rule._id, { destinations: newDests });
              }}
            />
            <Button size="small" onClick={() => removeDestination(rule._id, i)} color="error">Remove</Button>
          </Box>
        ))}
        <Button size="small" onClick={() => addDestination(rule._id)}>+ Add Destination</Button>
      </TableCell>
      <TableCell>
        <Button variant="outlined" color="error" onClick={() => deleteRule(rule._id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default RuleRow;