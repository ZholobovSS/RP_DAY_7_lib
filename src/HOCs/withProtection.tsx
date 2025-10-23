import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router';

export type UseAuthStrategy = () => {
    isAuthenticated: boolean;
    isReady: boolean;
};

export const withProtection = <P extends object>(
    WrappedComponent: ComponentType<P>,
    useAuthStrategy: UseAuthStrategy,
) => {
    function UpgradedComponent(props: P) {
        const { isAuthenticated, isReady } = useAuthStrategy();

        const location = useLocation();

        if (!isReady) return <div>Loading...</div>;

        if (!isAuthenticated) {
            return (
                <Navigate
                    to={'/signin'}
                    state={{
                        from: location.pathname,
                    }}
                    replace={true}
                />
            );
        }

        return <WrappedComponent {...props} />;
    }

    UpgradedComponent.displayName = `withProtection${WrappedComponent.displayName}`;

    return UpgradedComponent;
};
