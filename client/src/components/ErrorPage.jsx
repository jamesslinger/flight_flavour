import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorPage() {
  const error = useRouteError();
  console.error('Route error:', error);

  const getErrorDebugInfo = () => {
    try {
      if (!error) {
        return 'No error information available';
      }
      
      const errorObj = {
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        data: error.data
      };
      
      return JSON.stringify(errorObj, null, 2);
    } catch (e) {
      return `Error Status: ${error?.status || 'Unknown'}\nError Message: ${error?.statusText || error?.message || 'Unknown error'}\nSerialization Error: ${e?.message}`;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
            borderRadius: 3,
            pointerEvents: 'none'
          }
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 64,
            color: '#ffffff',
            mb: 2,
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
            position: 'relative',
            zIndex: 1
          }}
        />

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1
          }}
        >
          Sorry! Something went wrong...
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1, mt: 8 }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{
              minWidth: 120,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
              color: '#000000',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8))',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Go Back
          </Button>

          <Button
            variant="outlined"
            onClick={() => window.location.reload()}
            sx={{
              minWidth: 120,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: '#ffffff',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                borderColor: '#ffffff',
                background: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Try Again
          </Button>
        </Box>

        {process.env.NODE_ENV === 'development' && (
          <Box sx={{
            mt: 4,
            p: 2,
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            zIndex: 1
          }}>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                mb: 1
              }}
            >
              Debug Information (Development Only)
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{
                fontSize: '0.75rem',
                mt: 1,
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                background: 'rgba(0, 0, 0, 0.3)',
                p: 1,
                borderRadius: 1,
                overflow: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {(() => {
                try {
                  return getErrorDebugInfo();
                } catch (e) {
                  return `Error Debug Retrieval Failed: ${e?.message || 'Unknown error'}`;
                }
              })()}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}