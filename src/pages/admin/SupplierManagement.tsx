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
  FormControlLabel,
  Switch,
  Rating,
  Grid,
} from '@mui/material';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Store,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Bell,
  BellOff,
} from 'lucide-react';
import Swal from 'sweetalert2';
import type { Supplier, SupplierStatus, SupplierType } from '../../types/supplier';
import { SUPPLIER_TYPES, SUPPLIER_STATUS } from '../../types/supplier';
import { EQUIPMENT_CATEGORIES } from '../../types/nailEquipment';
import { Modal } from '../../components/ui/Modal';

// Mock data for demonstration
const initialSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'OPI International',
    type: 'manufacturer',
    contactPerson: 'John Smith',
    email: 'john@opi.com',
    phone: '+1-555-0101',
    address: '123 Nail Street',
    city: 'Los Angeles',
    country: 'USA',
    status: 'active',
    productsSupplied: ['gel', 'polish', 'tools'],
    rating: 4.5,
    contractStart: '2024-01-01',
    contractEnd: '2025-12-31',
    paymentTerms: 'Net 30',
    lowStockAlert: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01',
  },
  {
    id: '2',
    name: 'Beauty Supply Co',
    type: 'wholesaler',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@beautysupply.com',
    phone: '+1-555-0202',
    address: '456 Beauty Ave',
    city: 'New York',
    country: 'USA',
    status: 'active',
    productsSupplied: ['uv-lamps', 'tools', 'files-buffers'],
    rating: 4.0,
    paymentTerms: 'Net 45',
    lowStockAlert: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-28',
  },
  {
    id: '3',
    name: 'Nail Tech Supplies',
    type: 'distributor',
    contactPerson: 'Mike Chen',
    email: 'mike@nailtech.com',
    phone: '+1-555-0303',
    address: '789 Tech Blvd',
    city: 'San Francisco',
    country: 'USA',
    status: 'pending',
    productsSupplied: ['gel', 'uv-lamps'],
    rating: 3.5,
    lowStockAlert: false,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05',
  },
];

const emptySupplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  type: 'distributor',
  contactPerson: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  status: 'active',
  productsSupplied: [],
  rating: 0,
  contractStart: '',
  contractEnd: '',
  paymentTerms: '',
  notes: '',
  lowStockAlert: true,
};

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<SupplierType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<SupplierStatus | 'all'>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState(emptySupplier);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Filter and search
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [suppliers, searchQuery, typeFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: suppliers.length,
      active: suppliers.filter(s => s.status === 'active').length,
      withAlerts: suppliers.filter(s => s.lowStockAlert).length,
      avgRating: suppliers.reduce((acc, s) => acc + (s.rating || 0), 0) / suppliers.length,
    };
  }, [suppliers]);

  const handleOpenDialog = (item?: Supplier) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        type: item.type,
        contactPerson: item.contactPerson,
        email: item.email,
        phone: item.phone,
        address: item.address,
        city: item.city,
        country: item.country,
        status: item.status,
        productsSupplied: item.productsSupplied,
        rating: item.rating,
        contractStart: item.contractStart,
        contractEnd: item.contractEnd,
        paymentTerms: item.paymentTerms,
        notes: item.notes,
        lowStockAlert: item.lowStockAlert,
      });
    } else {
      setEditingItem(null);
      setFormData(emptySupplier);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData(emptySupplier);
  };

  const handleSave = () => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingItem) {
      setSuppliers(prev => prev.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, updatedAt: now }
          : item
      ));
      setSnackbar({ open: true, message: 'Supplier updated successfully', severity: 'success' });
    } else {
      const newItem: Supplier = {
        ...formData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      setSuppliers(prev => [...prev, newItem]);
      setSnackbar({ open: true, message: 'Supplier added successfully', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = async (id: string) => {
    const itemToDelete = suppliers.find(item => item.id === id);
    if (!itemToDelete) return;

    const result = await Swal.fire({
      title: 'Delete Supplier',
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
      inputPlaceholder: 'Enter supplier ID',
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
          return 'Please enter the supplier ID to confirm';
        }
        if (value !== id) {
          return `Incorrect ID. Please type "${id}" to confirm deletion`;
        }
        return null;
      }
    });

    if (result.isConfirmed && result.value === id) {
      setSuppliers(prev => prev.filter(item => item.id !== id));
      
      await Swal.fire({
        title: 'Deleted!',
        text: 'Supplier has been deleted successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#1e293b',
        color: '#f1f5f9',
      });
      
      setSnackbar({ open: true, message: 'Supplier deleted successfully', severity: 'success' });
    }
  };

  const getStatusIcon = (status: SupplierStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} />;
      case 'inactive':
        return <XCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      default:
        return <Store size={16} />;
    }
  };

  const getStatusColor = (status: SupplierStatus) => {
    const statusConfig = SUPPLIER_STATUS.find(s => s.value === status);
    return statusConfig?.color || 'default';
  };

  return (
    <Box>
      {/* Header with Statistics */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Supplier Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your nail salon suppliers and distributors
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: '12px' }}
        >
          Add Supplier
        </Button>
      </Stack>

      {/* Statistics Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1.5, bgcolor: 'primary.main', borderRadius: '12px', opacity: 0.1 }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>{stats.total}</Typography>
                <Typography variant="caption" color="text.secondary">Total Suppliers</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1.5, bgcolor: 'success.main', borderRadius: '12px', opacity: 0.1 }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>{stats.active}</Typography>
                <Typography variant="caption" color="text.secondary">Active Suppliers</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1.5, bgcolor: 'warning.main', borderRadius: '12px', opacity: 0.1 }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>{stats.withAlerts}</Typography>
                <Typography variant="caption" color="text.secondary">With Alerts</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1.5, bgcolor: 'info.main', borderRadius: '12px', opacity: 0.1 }} />
              <Box>
                <Typography variant="h4" fontWeight={700}>{stats.avgRating.toFixed(1)}</Typography>
                <Typography variant="caption" color="text.secondary">Avg Rating</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            placeholder="Search suppliers..."
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
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value as SupplierType | 'all')}
            >
              <MenuItem value="all">All Types</MenuItem>
              {SUPPLIER_TYPES.map(type => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value as SupplierStatus | 'all')}
            >
              <MenuItem value="all">All Status</MenuItem>
              {SUPPLIER_STATUS.map(status => (
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
                <TableCell>Supplier</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Alerts</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.contactPerson}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {SUPPLIER_TYPES.find(t => t.value === item.type)?.label}
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Mail size={14} />
                          <Typography variant="caption">{item.email}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Phone size={14} />
                          <Typography variant="caption">{item.phone}</Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MapPin size={14} />
                        <Typography variant="caption">
                          {item.city}, {item.country}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Rating value={item.rating || 0} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(item.status)}
                        label={SUPPLIER_STATUS.find(s => s.value === item.status)?.label}
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {item.lowStockAlert ? (
                        <Chip
                          icon={<Bell size={14} />}
                          label="On"
                          color="success"
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          icon={<BellOff size={14} />}
                          label="Off"
                          size="small"
                          variant="outlined"
                        />
                      )}
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
          count={filteredSuppliers.length}
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
        title={editingItem ? 'Edit Supplier' : 'Add New Supplier'}
        maxWidth="md"
        actions={
          <>
            <Button onClick={handleCloseDialog} sx={{ minWidth: 100 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!formData.name || !formData.email}
              sx={{ minWidth: 100 }}
            >
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </>
        }
      >
        <Stack spacing={3}>
          <TextField
            label="Supplier Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            fullWidth
          />
          
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value as SupplierType })}
              >
                {SUPPLIER_TYPES.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value as SupplierStatus })}
              >
                {SUPPLIER_STATUS.map(status => (
                  <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <TextField
            label="Contact Person"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              fullWidth
            />
          </Stack>

          <TextField
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              fullWidth
            />

            <TextField
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              fullWidth
            />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Products Supplied</InputLabel>
            <Select
              multiple
              value={formData.productsSupplied}
              label="Products Supplied"
              onChange={(e) => setFormData({ ...formData, productsSupplied: e.target.value as string[] })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip 
                      key={value} 
                      label={EQUIPMENT_CATEGORIES.find(c => c.value === value)?.label || value}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            >
              {EQUIPMENT_CATEGORIES.map(cat => (
                <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Contract Start"
              type="date"
              value={formData.contractStart}
              onChange={(e) => setFormData({ ...formData, contractStart: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Contract End"
              type="date"
              value={formData.contractEnd}
              onChange={(e) => setFormData({ ...formData, contractEnd: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <TextField
            label="Payment Terms"
            value={formData.paymentTerms}
            onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
            placeholder="e.g., Net 30, Net 45"
            fullWidth
          />

          <Box>
            <Typography variant="body2" gutterBottom>
              Rating
            </Typography>
            <Rating
              value={formData.rating || 0}
              onChange={(_, newValue) => setFormData({ ...formData, rating: newValue || 0 })}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={formData.lowStockAlert}
                onChange={(e) => setFormData({ ...formData, lowStockAlert: e.target.checked })}
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Bell size={16} />
                <Typography variant="body2">Enable low stock alerts</Typography>
              </Stack>
            }
          />

          <TextField
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

export default SupplierManagement;
