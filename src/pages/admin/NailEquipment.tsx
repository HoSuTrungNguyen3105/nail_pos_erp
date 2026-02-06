import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Swal from 'sweetalert2';
import type { NailEquipment, EquipmentCategory, EquipmentStatus } from '../../types/nailEquipment';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_STATUS } from '../../types/nailEquipment';
import { Modal } from '../../components/ui/Modal';

// Mock data for demonstration
const initialEquipment: NailEquipment[] = [
  {
    id: '1',
    name: 'OPI Gel Color - Red',
    category: 'gel',
    brand: 'OPI',
    quantity: 45,
    price: 15.99,
    unit: 'bottle',
    status: 'in-stock',
    description: 'Professional gel polish',
    supplier: 'Beauty Supply Co',
    minQuantity: 10,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01',
  },
  {
    id: '2',
    name: 'UV LED Lamp 48W',
    category: 'uv-lamps',
    brand: 'SunUV',
    quantity: 5,
    price: 89.99,
    unit: 'piece',
    status: 'low-stock',
    description: 'Professional UV LED nail lamp',
    supplier: 'Tech Supplies Inc',
    minQuantity: 3,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-28',
  },
  {
    id: '3',
    name: 'Nail File Set',
    category: 'files-buffers',
    brand: 'Generic',
    quantity: 0,
    price: 12.50,
    unit: 'set',
    status: 'out-of-stock',
    description: 'Professional nail file set',
    minQuantity: 15,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-20',
  },
];

const emptyEquipment: Omit<NailEquipment, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  category: 'tools',
  brand: '',
  quantity: 0,
  price: 0,
  unit: 'piece',
  status: 'in-stock',
  description: '',
  supplier: '',
  minQuantity: 0,
};

const NailEquipment: React.FC = () => {
  const [equipment, setEquipment] = useState<NailEquipment[]>(initialEquipment);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<EquipmentCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<EquipmentStatus | 'all'>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<NailEquipment | null>(null);
  const [formData, setFormData] = useState(emptyEquipment);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Filter and search
  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [equipment, searchQuery, categoryFilter, statusFilter]);

  const handleOpenDialog = (item?: NailEquipment) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        category: item.category,
        brand: item.brand,
        quantity: item.quantity,
        price: item.price,
        unit: item.unit,
        status: item.status,
        description: item.description,
        supplier: item.supplier,
        minQuantity: item.minQuantity,
      });
    } else {
      setEditingItem(null);
      setFormData(emptyEquipment);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData(emptyEquipment);
  };

  const handleSave = () => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingItem) {
      // Update existing item
      setEquipment(prev => prev.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, updatedAt: now }
          : item
      ));
      setSnackbar({ open: true, message: 'Equipment updated successfully', severity: 'success' });
    } else {
      // Create new item
      const newItem: NailEquipment = {
        ...formData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      setEquipment(prev => [...prev, newItem]);
      setSnackbar({ open: true, message: 'Equipment added successfully', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = async (id: string) => {
    const itemToDelete = equipment.find(item => item.id === id);
    if (!itemToDelete) return;

    const result = await Swal.fire({
      title: 'Delete Equipment',
      html: `
        <div style="text-align: left; margin-bottom: 20px;">
          <p style="margin-bottom: 12px;">You are about to delete:</p>
          <div style="background: rgba(217, 70, 239, 0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #d946ef;">
            <strong style="color: #e879f9;">${itemToDelete.name}</strong><br/>
            <small style="color: #94a3b8;">ID: ${id}</small>
          </div>
          <p style="margin-top: 16px; color: #f87171; font-weight: 600;">
            ⚠️ This action cannot be undone!
          </p>
          <p style="margin-top: 8px;">Type <strong style="color: #e879f9;">${id}</strong> to confirm deletion:</p>
        </div>
      `,
      input: 'text',
      inputPlaceholder: 'Enter equipment ID',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#be123c',
      cancelButtonColor: '#64748b',
      background: '#1e293b',
      color: '#f1f5f9',
      inputAttributes: {
        style: 'background: #0f172a; color: #f1f5f9; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px;'
      },
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-confirm',
        cancelButton: 'swal-custom-cancel',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter the equipment ID to confirm';
        }
        if (value !== id) {
          return `Incorrect ID. Please type "${id}" to confirm deletion`;
        }
        return null;
      }
    });

    if (result.isConfirmed && result.value === id) {
      setEquipment(prev => prev.filter(item => item.id !== id));
      
      await Swal.fire({
        title: 'Deleted!',
        text: 'Equipment has been deleted successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#1e293b',
        color: '#f1f5f9',
      });
      
      setSnackbar({ open: true, message: 'Equipment deleted successfully', severity: 'success' });
    }
  };

  const getStatusIcon = (status: EquipmentStatus) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle size={16} />;
      case 'low-stock':
        return <AlertTriangle size={16} />;
      case 'out-of-stock':
        return <XCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const getStatusColor = (status: EquipmentStatus) => {
    const statusConfig = EQUIPMENT_STATUS.find(s => s.value === status);
    return statusConfig?.color || 'default';
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Nail Equipment Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your nail salon equipment and supplies
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: '12px' }}
        >
          Add Equipment
        </Button>
      </Stack>

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value as EquipmentCategory | 'all')}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {EQUIPMENT_CATEGORIES.map(cat => (
                <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value as EquipmentStatus | 'all')}
            >
              <MenuItem value="all">All Status</MenuItem>
              {EQUIPMENT_STATUS.map(status => (
                <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipment
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {item.name}
                      </Typography>
                      {item.description && (
                        <Typography variant="caption" color="text.secondary">
                          {item.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {EQUIPMENT_CATEGORIES.find(c => c.value === item.category)?.label}
                    </TableCell>
                    <TableCell>{item.brand || '-'}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                        <Typography
                          variant="body2"
                          color={item.quantity <= item.minQuantity ? 'error' : 'text.primary'}
                          fontWeight={item.quantity <= item.minQuantity ? 600 : 400}
                        >
                          {item.quantity}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.unit}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(item.status)}
                        label={EQUIPMENT_STATUS.find(s => s.value === item.status)?.label}
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(item)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Edit2 size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredEquipment.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>

      {/* Add/Edit Dialog */}
      <Modal
        open={openDialog}
        onClose={handleCloseDialog}
        title={editingItem ? 'Edit Equipment' : 'Add New Equipment'}
        maxWidth="md"
        actions={
          <>
            <Button onClick={handleCloseDialog} sx={{ minWidth: 100 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!formData.name || formData.price <= 0}
              sx={{ minWidth: 100 }}
            >
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </>
        }
      >
        <Stack spacing={3}>
          <TextField
            label="Equipment Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            fullWidth
          />
          
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value as EquipmentCategory })}
              >
                {EQUIPMENT_CATEGORIES.map(cat => (
                  <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              required
              fullWidth
            />

            <TextField
              label="Min Quantity"
              type="number"
              value={formData.minQuantity}
              onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) || 0 })}
              fullWidth
            />

            <TextField
              label="Unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              required
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EquipmentStatus })}
              >
                {EQUIPMENT_STATUS.map(status => (
                  <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <TextField
            label="Supplier"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            fullWidth
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NailEquipment;
