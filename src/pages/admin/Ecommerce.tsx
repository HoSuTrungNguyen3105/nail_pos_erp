import React, { useState } from 'react';
import SEO from './components/SEO';
import { ShoppingCart, TrendingUp, Package, DollarSign, Edit, Trash2, Eye } from 'lucide-react';
import { Box, Checkbox, Chip, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { InputTableWrapperCustom, type HeaderColumn } from '../../components/ui/Table';

const stats = [
  { icon: ShoppingCart, label: 'Total Orders', value: '1,234', color: '#d946ef' },
  { icon: Package, label: 'Products', value: '567', color: '#14b8a6' },
  { icon: DollarSign, label: 'Revenue', value: '$45,678', color: '#a855f7' },
  { icon: TrendingUp, label: 'Growth', value: '+12.5%', color: '#3b82f6' },
];

const Ecommerce: React.FC = () => {
  const headersColumn: HeaderColumn[] = [
    { label: "ID", key: "id", width: 80 },

    {
      label: "Tên sản phẩm",
      key: "name",
      minWidth: 200,
      filterType: "text",
    },

    {
      label: "Danh mục",
      key: "category",
      minWidth: 150,
      filterType: "select",
      options: [
        { label: "Tất cả", value: "" },
        { label: "Laptop", value: "Laptop" },
        { label: "Mobile", value: "Mobile" },
        { label: "Accessory", value: "Accessory" },
      ],
    },

    {
      label: "Giá",
      key: "price",
      width: 120,
      filterType: "text",
    },

    {
      label: "Trạng thái",
      key: "status",
      width: 120,
      filterType: "select",
      options: [
        { label: "Tất cả", value: "" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },

    { label: "Hành động", key: "action", width: 120 },
  ];

  const rows = [
    {
      id: 1,
      name: "MacBook Pro M3",
      category: "Laptop",
      price: "$2,499",
      status: "Active",
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      category: "Mobile",
      price: "$1,299",
      status: "Inactive",
    },
    {
      id: 3,
      name: "AirPods Pro",
      category: "Accessory",
      price: "$249",
      status: "Active",
    },
  ];
  const [selected, setSelected] = useState<number[]>([]);
  const isSelectedAll = selected.length === rows.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked ? rows.map((r) => r.id) : []);
  };

  const toggleRow = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };
  return (
    <>
      <SEO
        title="eCommerce - TailAdmin"
        description="Manage your online store, products, orders, and sales analytics."
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Page Header */}
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            eCommerce Dashboard
          </Typography>
          <Typography mt={1} color="text.secondary">
            Manage your online store and track sales performance
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <Grid size={3} sx={{ md: 6, lg: 3 }} key={idx}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: '#ffffff',
                    border: '1px solid rgba(217, 70, 239, 0.15)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'all .2s',
                    '&:hover': {
                      background: 'rgba(217, 70, 239, 0.02)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: `${stat.color}33`,
                      }}
                    >
                      <Icon size={24} color={stat.color} />
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} color="text.primary">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <InputTableWrapperCustom
          headersColumn={headersColumn}
          isSelectedAll={isSelectedAll}
          handleSelectAll={handleSelectAll}
        >
          {rows.map((row) => {
            const isChecked = selected.includes(row.id);

            return (
              <TableRow key={row.id}>
                <TableCell sx={{ width: 48 }}>
                  <Checkbox
                    checked={isChecked}
                    onChange={() => toggleRow(row.id)}
                  />
                </TableCell>

                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.price}</TableCell>

                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor:
                        row.status === "Active"
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(239,68,68,0.15)",
                      color:
                        row.status === "Active"
                          ? "#22c55e"
                          : "#ef4444",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ width: 120 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Xem chi tiết">
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "rgba(59,130,246,0.15)",
                          color: "#60a5fa",
                          "&:hover": {
                            bgcolor: "rgba(59,130,246,0.25)",
                          },
                        }}
                        onClick={() => console.log("view", row.id)}
                      >
                        <Eye size={16} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "rgba(34,197,94,0.15)",
                          color: "#22c55e",
                          "&:hover": {
                            bgcolor: "rgba(34,197,94,0.25)",
                          },
                        }}
                        onClick={() => console.log("edit", row.id)}
                      >
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Xóa">
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "rgba(239,68,68,0.15)",
                          color: "#ef4444",
                          "&:hover": {
                            bgcolor: "rgba(239,68,68,0.25)",
                          },
                        }}
                        onClick={() => console.log("delete", row.id)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </InputTableWrapperCustom>

        <Box
          sx={{
            p: 6,
            borderRadius: 3,
            textAlign: 'center',
            background:
              'rgba(217, 70, 239, 0.03)',
            border: '1px solid rgba(217, 70, 239, 0.1)',
          }}
        >
          <ShoppingCart size={64} color="#d946ef" />
          <Typography variant="h5" fontWeight={700} color="primary.main" mt={2}>
            eCommerce Module
          </Typography>
          <Typography
            mt={1}
            color="text.secondary"
            maxWidth={500}
            mx="auto"
          >
            Full eCommerce management features including product catalog,
            inventory, orders, and customer management are coming soon.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Ecommerce;
