import { assert } from 'chai';
import sinon from 'sinon';
import fetch from 'node-fetch';
import { getUserData } from '../src/api.js';

describe('getUserData', () => {
    let fetchStub;
    
    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
        fetchStub.restore();
    });

    it('debe devolver datos de usuario cuando la API responde con 200', async () => {
        const mockResponse = {
            json: async () => ({ id: 1, name: 'Juan Perez' }),
            ok: true
        };
        fetchStub.resolves(mockResponse);

        const userData = await getUserData(1);
        assert.deepEqual(userData, { id: 1, name: 'Juan Perez' });
    });

    it('debe lanzar un error cuando la API responde con 404', async () => {
        const mockResponse = { ok: false, status: 404 };
        fetchStub.resolves(mockResponse);

        try {
            await getUserData(1);
        } catch (error) {
            assert.equal(error.message, 'Error: 404');
        }
    });
});
