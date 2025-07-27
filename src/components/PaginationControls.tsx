import { Box, Button, Typography } from '@mui/material';

const PaginationControls = ({
  page,
  totalPages,
  totalCount,
  onPageChange
}: {
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
}) => (
  <Box mt={2} display="flex" justifyContent="space-between">
    <Typography>
      Page {page} / {totalPages} (Total: {totalCount})
    </Typography>
    <Box>
      <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
      <Button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</Button>
    </Box>
  </Box>
);

export default PaginationControls;