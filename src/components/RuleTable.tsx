import { Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Paper
} from '@mui/material';
import RuleRow from './RuleRow';
import { Rule } from '../types/policy';

interface RuleTableProps {
  rules: Rule[];
  updateRule: (id: string, update: Partial<Rule>) => void;
  modifyRule: (id: string, update: Partial<Rule>) => void;
  addSource: (id: string) => void;
  removeSource: (id: string, index: number) => void;
  addDestination: (id: string) => void;
  removeDestination: (id: string, index: number) => void;
}

const RuleTable = ({
  rules,
  updateRule,
  modifyRule,
  addSource,
  removeSource,
  addDestination,
  removeDestination
}: RuleTableProps) => (
  <Droppable droppableId="rules-droppable">
    {provided => (
      <TableContainer component={Paper} ref={provided.innerRef} {...provided.droppableProps}>
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
            {rules.filter(r => !r.isDeleted).map((rule, idx) => (
              <Draggable key={rule._id} draggableId={rule._id} index={idx}>
                {dragProvided => (
                  <RuleRow
                    rule={rule}
                    index={idx}
                    updateRule={updateRule}
                    deleteRule={id => modifyRule(id, { isDeleted: true, isEdited: true })}
                    addSource={addSource}
                    removeSource={removeSource}
                    addDestination={addDestination}
                    removeDestination={removeDestination}
                    dragProvided={dragProvided}
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
);

export default RuleTable;