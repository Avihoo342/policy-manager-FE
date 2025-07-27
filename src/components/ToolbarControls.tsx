import { Box, Button, TextField } from '@mui/material';

const ToolbarControls = ({
  searchTerm,
  onSearchChange,
  onAddRule,
  onSave
}: {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onAddRule: () => void;
  onSave: () => void;
}) => (
  <Box mb={2} display="flex" gap={2}>
    <TextField
      label="Search by Source Name"
      size="small"
      value={searchTerm}
      onChange={e => onSearchChange(e.target.value)}
    />
    <Button variant="contained" onClick={onAddRule}>Add New Rule</Button>
    <Button variant="contained" onClick={onSave}>Save Policy</Button>
  </Box>
);

export default ToolbarControls;